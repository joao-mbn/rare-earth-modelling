import { Property } from './../../contracts/Interfaces/Property';
import { InputField } from './../../contracts/Classes/InputField';
import { DropdownField } from './../../contracts/Classes/DropdownField';
import { Uom } from 'src/app/contracts/Interfaces/Uom';
import { ProjectOperationalVariable } from './../../contracts/Interfaces/OperationalVariable';
import { ElementProperties } from './../../contracts/Interfaces/ElementProperties';
import { ValidationService } from './../../services/validation.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../contracts/Interfaces/Project';
import { PROJECT } from '../../../mocks/project';
import { Material } from 'src/app/contracts/Interfaces/Material';
import { OptionToDropdown } from 'src/app/contracts/Interfaces/OptionToDropdown';
import * as defaultOptions from '../../../mocks/defaultOptions';
import { groupBy } from 'src/app/utils/groupBy';
import { materialsToOptionsToDropdown, uomsToOptionsToDropdown } from 'src/app/contracts/Mappers/ToOptionToDropdown';

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
  forms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { project: Project },
  ) { }

  ngOnInit(): void {
    this.getOptions();
    this.groupByType();
    this.data ? this.destructureProject() : this.getProjectTemplate();
    this.addSelections();
    this.buildForms();
  }

  private getOptions(): void {
    //TODO implement service
    this.uoms = defaultOptions.UOMS;
    this.materials = defaultOptions.MATERIALS;
  }

  private groupByType(): void {
    this.materialsByType = groupBy(this.materials, 'type');
    this.uomsByType = groupBy(this.uoms, 'uomType');
    this.etrs = materialsToOptionsToDropdown(this.materialsByType['etr']);
  }

  private addSelections(): void {
    const selectedEtrsIds = this.economicVariables.filter(variable => variable.type === 'etr').map(variable => variable.materialId);
    this.etrs.forEach(etr => {
      if (selectedEtrsIds.some(id => id === etr.id)) { etr.isSelected = true }
      else { etr.isSelected = false };
    })
    this.materials
      .filter(material => material.type === 'etr')
      .forEach(etr => {
        if (selectedEtrsIds.some(id => id === etr.materialId)) { etr.isSelected = true }
        else { etr.isSelected = false };
      })
  }

  private getProjectTemplate(): void {
    //TODO implement the service that gets this template
    this.data = { project: PROJECT };
    this.destructureProject();
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
    this.forms = this.formBuilder.group({
      project: this.formBuilder.control(new InputField({ value: this.projectName, label: 'Name your project...', isMandatory: true, key: 'project-name' })),
      etrOptions: this.formBuilder.control(new DropdownField({ options: this.etrs, label: 'Choose ETRs...', isMandatory: true, key: 'etr' })),
      modelConstants: this.formBuilder.array([]),
      operationalVariables: this.formBuilder.array([]),
      economicVariables: this.formBuilder.array([]),
    });
    this.buildOperationalVariablesForms();
    this.buildEconomicVariablesForms();
    this.materials.filter(material => material.type === 'etr').forEach(material => material.isSelected ? this.addEtr(material) : false);
  }

  public onSelectEtr(option: OptionToDropdown): void {
    const etr = this.materials.find(material => material.materialId === option.id);
    if (etr) {
      etr.isSelected = etr.isSelected ? false : true;
      etr.isSelected ? this.addEtr(etr) : this.removeEtr(etr);
    };
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

  private addEtr(etr: Material): void {
    this.buildModelConstantsForms(etr);
    this.buildEconomicVariablesForms(true, etr.shortString);
  }

  private removeEtr(etr: Material): void {
    const modelConstantsArray = (this.forms.get('modelConstants') as FormArray);
    let index = Array(modelConstantsArray.length).findIndex((index) => { this.forms.get(['modelConstants', index, 'etr'])?.value as string === etr.symbol });
    modelConstantsArray.removeAt(index);

    const economicVariablesArray = (this.forms.get('economicVariables') as FormArray);
    index = Array(modelConstantsArray.length).findIndex((index) => { this.forms.get(['economicVariables', index, 'etr'])?.value as string === etr.longString });
    modelConstantsArray.removeAt(index);
  };

  private buildModelConstantsForms(etr: Material): void {
    const modelConstant = this.modelConstants.find(constant => constant.materialId === etr.materialId)!;
    let modelConstantFormsArray = this.formBuilder.array([]);

    modelConstant.defaultProperties.forEach(property => {
      const uomOptionsToDropdown = uomsToOptionsToDropdown(this.uomsByType[property.uomType] as Uom[]);
      modelConstantFormsArray.push(
        this.formBuilder.group({
          constant: this.formBuilder.control(new InputField({ value: property.value, label: property.description, isMandatory: true, key: 'constant' })),
          constantUom: this.formBuilder.control(new DropdownField({ options: uomOptionsToDropdown, value: property.uomLongString, label: 'Choose UOM...', isMandatory: property.uomType !== 'none', key: 'constant-uom', hidden: property.uomType === 'none' })),
        })
      )
    })
    const modelConstantToForm = this.formBuilder.group({
      etr: this.formBuilder.control(new InputField({ value: modelConstant.symbol, label: modelConstant.longString, isEditable: false, key: 'etr' })),
      modelConstantFormsArray: modelConstantFormsArray
    });
    (this.forms.get('modelConstants') as FormArray).push(modelConstantToForm);
  }

  private buildOperationalVariablesForms(): void {
    this.operationalVariables.forEach((variable) => {
      (this.forms.get('operationalVariables') as FormArray).push(
        this.formBuilder.group({
          variableName: this.formBuilder.control(new InputField({ value: variable.name, label: variable.name, isEditable: false, key: 'variable-name' })),
          sliderRange: this.formBuilder.control(new InputField({ value: variable.value, min: variable.min, max: variable.max, step: variable.step, key: 'variable-range' })),
          step: this.formBuilder.control(new InputField({ value: variable.step, key: 'variable-step' })),
        })
      );
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

        (this.forms.get('economicVariables') as FormArray).push(
          this.formBuilder.group({
            materialType: this.formBuilder.control(new InputField({ value: materialType, label: materialType, isEditable: false, key: 'material-type' })),
            material: this.formBuilder.control(new DropdownField({ options: materialOptionsToDropdown, value: material.longString, label: materialType, isEditable: !isEtr, isMandatory: true, key: 'material' })),
            price: this.formBuilder.control(new InputField({ value: price?.value, label: '$', isMandatory: true, key: 'price' })),
            priceUom: this.formBuilder.control(new DropdownField({ options: priceUomOptionsToDropdown, value: price?.uomLongString, label: 'Choose UOM...', isMandatory: true, key: 'price-uom' })),
          })
        )
      })
  }

}
