import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from 'src/app/contracts/Interfaces/Material';
import { OptionToDropdown } from 'src/app/contracts/Interfaces/OptionToDropdown';
import { ProjectForms } from 'src/app/contracts/Interfaces/ProjectForms';
import { Uom } from 'src/app/contracts/Interfaces/Uom';
import { materialsToOptionsToDropdown, uomsToOptionsToDropdown } from 'src/app/contracts/Mappers/ToOptionToDropdown';
import { groupBy } from 'src/app/utils/groupBy';
import * as defaultOptions from '../../../mocks/defaultOptions';
import { PROJECT } from '../../../mocks/project';
import { Project } from '../../contracts/Interfaces/Project';
import { ProjectService } from '../../services/project.service';
import { DropdownField } from './../../contracts/Classes/DropdownField';
import { InputField } from './../../contracts/Classes/InputField';
import { ElementProperties } from './../../contracts/Interfaces/ElementProperties';
import { ProjectOperationalVariable } from './../../contracts/Interfaces/OperationalVariable';

@Component({
  selector: 'app-modal-configuration',
  templateUrl: './modal-configuration.component.html',
  styleUrls: ['./modal-configuration.component.scss']
})
export class ModalConfigurationComponent implements OnInit {

  project!: Project;

  projectName!: string;
  economicVariables!: Material[];
  modelConstants!: ElementProperties[];
  operationalVariables!: ProjectOperationalVariable[];

  uoms!: Uom[];
  materials!: Material[];
  uomsByType!: { [type: string]: Uom[] };
  materialsByType!: { [type: string]: Material[] };
  etrs!: OptionToDropdown[];
  form!: FormGroup;
  propertiesToForm = { modelConstants: [], operationalVariables: [], economicVariables: [] } as unknown as ProjectForms;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { project: Project },
  ) { }

  ngOnInit(): void {
    this.getOptions();
    if (!this.data) { this.getProjectTemplate(); };
    this.destructureProject();
    this.buildForms();
  }

  private getOptions(): void {
    //TODO implement service
    this.uoms = defaultOptions.UOMS;
    this.materials = defaultOptions.MATERIALS;
    this.materialsByType = groupBy(this.materials, 'type');
    this.uomsByType = groupBy(this.uoms, 'uomType');
    this.etrs = materialsToOptionsToDropdown(this.materialsByType['etr']);
  }

  private getProjectTemplate(): void {
    //TODO implement the service that gets this template
    this.data = { project: PROJECT };
  }

  private destructureProject(): void {
    this.data = this.data as { project: Project };
    this.projectName = this.data.project.longString;
    this.modelConstants = this.data.project.projectConfiguration.modelConstants;
    this.operationalVariables = this.data.project.projectConfiguration.operationalVariables;
    this.economicVariables = this.data.project.projectConfiguration.economicVariables;
  }

  private buildForms(): void {
    //TODO transfer all of this to a service
    this.form = this.formBuilder.group({
      project: this.formBuilder.control(this.projectName),
      modelConstants: this.formBuilder.array([]),
      operationalVariables: this.formBuilder.array([]),
      economicVariables: this.formBuilder.array([]),
    });
    this.propertiesToForm.project = new InputField({ value: this.projectName, label: 'Name your project...', isMandatory: true, key: 'project' });
    this.economicVariables.filter(material => material.type === 'etr').forEach(etr => this.addEtr(etr));
    this.buildOperationalVariablesForms();
    this.buildEconomicVariablesForms();
  }

  public onSelectEtr(option: OptionToDropdown): void {

  }

  public onRemoveEtr(index: number): void {
    const modelConstantsArray = (this.form.get('modelConstants') as FormArray);
    //let index = Array(modelConstantsArray.length).findIndex((index) => { this.form.get(['modelConstants', index, 'etr'])?.value as string === etr.symbol });
    modelConstantsArray.removeAt(index);

    /* const economicVariablesArray = (this.form.get('economicVariables') as FormArray);
    index = Array(modelConstantsArray.length).findIndex((index) => { this.form.get(['economicVariables', index, 'etr'])?.value as string === etr.longString });
    modelConstantsArray.removeAt(index); */
  };

  private addEtr(etr: Material): void {
    this.buildModelConstantsForms(etr);
    this.buildEconomicVariablesForms(true, etr.shortString);
  }

  private buildModelConstantsForms(etr: Material): void {
    const modelConstant = this.modelConstants.find(constant => constant.materialId === etr.materialId)!;
    let modelConstantFormsArray = this.formBuilder.array([]);
    let modelConstantPropertyToForms: { constant: InputField, constantUom: DropdownField }[] = [];

    modelConstant.defaultProperties.forEach(property => {
      const uomOptionsToDropdown = uomsToOptionsToDropdown(this.uomsByType[property.uomType] as Uom[]);
      modelConstantFormsArray.push(
        this.formBuilder.group({
          constant: this.formBuilder.control(property.value),
          constantUom: this.formBuilder.control(property.uomLongString),
        })
      );
      modelConstantPropertyToForms.push({
        constant: new InputField({ value: property.value, label: property.description, isMandatory: true, key: 'constant' }),
        constantUom: new DropdownField({ options: uomOptionsToDropdown, value: property.uomLongString, label: 'Choose UOM...', isMandatory: property.uomType !== 'none', key: 'constantUom', hidden: property.uomType === 'none' })
      });
    });

    (this.form.get('modelConstants') as FormArray).push(
      this.formBuilder.group({
        etr: this.formBuilder.control(modelConstant.longString),
        modelConstantFormsArray: modelConstantFormsArray
      })
    );
    this.propertiesToForm.modelConstants.push({
      etr: new DropdownField({ options: this.etrs, value: modelConstant.longString, label: 'Choose ETR...', key: 'etr' }),
      modelConstantPropertyToForms: modelConstantPropertyToForms
    });

  }

  private buildOperationalVariablesForms(): void {
    this.operationalVariables.forEach((variable) => {

      (this.form.get('operationalVariables') as FormArray).push(
        this.formBuilder.group({
          variableName: this.formBuilder.control(variable.name),
          sliderRange: this.formBuilder.control(variable.value),
          step: this.formBuilder.control(variable.step),
        })
      );
      this.propertiesToForm.operationalVariables.push({
        variableName: new InputField({ value: variable.name, label: variable.name, isDisabled: true, key: 'variableName' }),
        sliderRange: new InputField({ value: variable.value, min: variable.min, max: variable.max, step: variable.step, key: 'sliderRange' }),
        step: new InputField({ value: variable.step, key: 'step' }),
      })
    })
  }

  private buildEconomicVariablesForms(isEtr = false, etr?: string): void {
    Object.keys(this.materialsByType)
      .filter(materialType => isEtr ? materialType === 'etr' : materialType !== 'etr')
      .forEach((materialType) => {
        const materialOptions = this.materialsByType[materialType] as Material[];
        const material = etr ? materialOptions.find(material => material.shortString === etr)! : materialOptions[0];
        const materialOptionsToDropdown = materialsToOptionsToDropdown(materialOptions);
        const price = material.defaultProperties.find(property => property.propertyLongString === 'Price');
        const priceUomOptionsToDropdown = uomsToOptionsToDropdown(this.uomsByType[price!.uomType] as Uom[]);

        (this.form.get('economicVariables') as FormArray).push(
          this.formBuilder.group({
            materialType: this.formBuilder.control(materialType),
            material: this.formBuilder.control(material.longString),
            price: this.formBuilder.control(price?.value),
            priceUom: this.formBuilder.control(price?.uomLongString),
          })
        )

        this.propertiesToForm.economicVariables.push({
          materialType: new InputField({ value: materialType, label: materialType, isDisabled: true, key: 'material-type' }),
          material: new DropdownField({ options: materialOptionsToDropdown, value: material.longString, label: materialType, isDisabled: isEtr, isMandatory: true, key: 'material' }),
          price: new InputField({ value: price?.value, label: '$', isMandatory: true, key: 'price' }),
          priceUom: new DropdownField({ options: priceUomOptionsToDropdown, value: price?.uomLongString, label: 'Choose UOM...', isMandatory: true, key: 'price-uom' })
        })

      })
  }

  public onSave(): void {
    //TODO implement
    this.projectService.postProject(this.project as Project).subscribe(
      (response: boolean) => { console.log('to implement') }
    );
    this.closeModal();
  }

  public onCancel(): void {
    //TODO modal "are you sure you want to leave without saving your changes?"
    this.closeModal();
  }

  private closeModal(): void {
    this.dialogRef.close(this.data);
  }

  get getModelConstants() {
    return this.form.get('modelConstants') as FormArray;
  }
  getModelConstantPropertyToForms(index: number) {
    return (this.form.get('modelConstants') as FormArray).controls[index].get('modelConstantFormsArray') as FormArray;
  }
  get getOperationalVariables() {
    return this.form.get('operationalVariables') as FormArray;
  }
  get getEconomicVariables() {
    return this.form.get('economicVariables') as FormArray;
  }
  getGroupInArray(formGroup: any) {
    return formGroup as FormGroup;
  }

}
