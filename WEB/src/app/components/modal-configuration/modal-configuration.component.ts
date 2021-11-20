import { Uom } from 'src/app/contracts/Interfaces/Uom';
import { SummaryOperationalVariable } from './../../contracts/Interfaces/OperationalVariable';
import { ElementProperties } from './../../contracts/Interfaces/ElementProperties';
import { ValidationService } from './../../services/validation.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../contracts/Interfaces/Project';
import { PROJECT } from '../../../mocks/project';
import { Material } from 'src/app/contracts/Interfaces/Material';
import { OptionToDropdown } from 'src/app/contracts/Interfaces/OptionsToDropdown';
import * as defaultOptions from '../../../mocks/defaultOptions';
import { groupBy } from 'src/app/utils/groupBy';

@Component({
  selector: 'app-modal-configuration',
  templateUrl: './modal-configuration.component.html',
  styleUrls: ['./modal-configuration.component.scss']
})
export class ModalConfigurationComponent implements OnInit {

  project!: Project;
  displayDefault!: boolean;

  projectName!: string;
  economicVariables!: Material[];
  modelConstants!: ElementProperties[];
  operationalVariables!: SummaryOperationalVariable[];

  uoms: Uom[] = defaultOptions.UOMS;
  materials: Material[] = defaultOptions.MATERIALS;

  etrs!: OptionToDropdown[];
  acids!: OptionToDropdown[];
  bases!: OptionToDropdown[];
  extractants!: OptionToDropdown[];
  solvents!: OptionToDropdown[];

  etrConcentrationUoms!: OptionToDropdown[];
  pounderalPriceUoms!: OptionToDropdown[];
  volumetricPriceUoms!: OptionToDropdown[];
  unitPriceUoms!: OptionToDropdown[];

  forms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { project: Project },
  ) { }

  ngOnInit(): void {
    this.addSelections();
    this.separateByType();
    this.data ? this.destructureProject() : this.buildProjectTemplate();
    this.buildForms();
  }

  private addSelections(): void {
    this.uoms.forEach(uom => uom.isSelected = uom.isSelected ?? false);
    this.materials.forEach(material => material.isSelected = material.isSelected ?? false);
  }

  private separateByType(): void {
    const uomsByType = groupBy(this.uoms, 'type');
    Object.entries(uomsByType).forEach(entry => {
      switch (entry[0]) {
        case 'etr-concentration':
          this.etrConcentrationUoms = entry[1].map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
          break
        case 'pounderal-price':
          this.pounderalPriceUoms = entry[1].map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
          break
        case 'volumetric-price':
          this.volumetricPriceUoms = entry[1].map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
          break
        case 'unit-price':
          this.unitPriceUoms = entry[1].map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
          break
      }
    })
    this.etrs = this.materials
      .filter(material => material.type === 'etr')
      .map(material => { return { value: material.longString, id: material.materialId, disabled: false }; });
  }

  private buildProjectTemplate(): Project {
    return PROJECT;
  }

  private destructureProject(): void {
    this.data = this.data as { project: Project };
    this.projectName = this.data.project.longString;
    this.modelConstants = this.data.project.projectConfiguration.modelConstants;
    this.operationalVariables = this.data.project.projectConfiguration.operationalVariables;
    this.economicVariables = this.data.project.projectConfiguration.economicVariables;
  }

  private buildForms(): void {
    this.forms = this.formBuilder.group({
      etrOptions: '',
      modelConstants: this.formBuilder.array([]),
      operationalVariables: this.formBuilder.group(this.buildOperationalVariablesForms()),
      economicVariables: this.formBuilder.array(this.buildEconomicVariablesForms()),
    });
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

  public onSelectEtr(option: OptionToDropdown): void {
    const etr = this.materials.find(material => material.materialId === option.id);
    if (etr) {
      etr.isSelected = etr.isSelected ? false : true;
      etr.isSelected ? this.addEtrs(etr) : this.removeEtrs(etr);
    };
  }

  private closeModal(): void {
    this.dialogRef.close(this.data);
  }

  private addEtrs(etr: Material): void {
    const modelConstant = this.modelConstants.find(constant => constant.materialId === etr.materialId);
    const a = modelConstant?.defaultProperties.find(property => property.description === 'a')?.value;
    const b = modelConstant?.defaultProperties.find(property => property.description === 'b')?.value;
    const initialAqueousConcentration = modelConstant?.defaultProperties.find(property => property.description === 'Initial Aqueous Concentration');
    const initialOrganicConcentration = modelConstant?.defaultProperties.find(property => property.description === 'Initial Organic Concentration');
    const modelConstantToForm = this.formBuilder.group({
      etr: modelConstant?.symbol,
      a: a,
      b: b,
      initialAqueousConcentration: initialAqueousConcentration?.value,
      initialAqueousConcentrationUom: initialAqueousConcentration?.uomLongString,
      initialOrganicConcentration: initialOrganicConcentration?.value,
      initialOrganicConcentrationUom: initialOrganicConcentration?.uomLongString
    })

    const economicVariable = etr;
    const price = economicVariable.defaultProperties.find(property => property.propertyLongString === 'Price');
    const economicVariableToForm = this.formBuilder.group({ etr: economicVariable.symbol, price: price?.value, priceUom: price?.uomLongString });

    (this.forms.get('modelConstants') as FormArray).push(modelConstantToForm);
    (this.forms.get('economicVariables') as FormArray).push(economicVariableToForm);
  }

  private removeEtrs(etr: Material): void {
    const modelConstantsArray = (this.forms.get('modelConstants') as FormArray);
    Array(modelConstantsArray.length).some((i) => {
      const etrToDelete = this.forms.get(['modelConstants', 0, 'etr'])?.value as string;
      if (etrToDelete === etr.symbol) {
        modelConstantsArray.removeAt(i);
        return true;
      } else {
        return false;
      }
    });
  };

  private buildOperationalVariablesForms(): { [name: string]: number[] } {
    let operationalVariablesForms: { [name: string]: number[] } = {};
    this.operationalVariables.forEach((variable) => {
      Object.assign(operationalVariablesForms, { [variable.name]: variable.value })
    })
    return operationalVariablesForms;
  }

  private buildEconomicVariablesForms(): FormGroup[] {
    const economicVariablesByType = groupBy(this.economicVariables, 'type');
    let economicVariableToForm: FormGroup[] = [];
    Object.keys(economicVariablesByType)
      .filter(materialType => materialType !== 'etr')
      .forEach((materialType) => {
        const defaultMaterial = economicVariablesByType[materialType][0] as Material;
        const price = defaultMaterial.defaultProperties.find(property => property.propertyLongString === 'Price');
        economicVariableToForm.push(
          this.formBuilder.group({ materialType: materialType, material: defaultMaterial.longString, price: price?.value, priceUom: price?.uomLongString })
        )
      })
    return economicVariableToForm;
  }

}
