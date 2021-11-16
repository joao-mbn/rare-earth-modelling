import { Uom } from 'src/app/contracts/Interfaces/Uom';
import { SummaryOperationalVariable } from './../../contracts/Interfaces/OperationalVariable';
import { ElementProperties } from './../../contracts/Interfaces/ElementProperties';
import { ValidationService } from './../../services/validation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../contracts/Interfaces/Project';
import { PROJECT } from '../../../mocks/project';
import { Material } from 'src/app/contracts/Interfaces/Material';
import { OptionToDropdown } from 'src/app/contracts/Interfaces/OptionsToDropdown';
import * as defaultOptions from '../../../mocks/defaultOptions';

@Component({
  selector: 'app-modal-configuration',
  templateUrl: './modal-configuration.component.html',
  styleUrls: ['./modal-configuration.component.scss']
})
export class ModalConfigurationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { project: Project },
  ) { }

  project!: Project;
  displayDefault!: boolean;

  projectName!: string;
  economicVariables!: Material[];
  modelConstants!: ElementProperties[];
  operationalVariable!: SummaryOperationalVariable[];

  uoms: Uom[] = defaultOptions.UOMS;
  materials: Material[] = defaultOptions.MATERIALS;

  etrs!: OptionToDropdown[];
  etrConcentrationUoms!: OptionToDropdown[];
  pounderalPriceUoms!: OptionToDropdown[];
  volumetricPriceUoms!: OptionToDropdown[];
  unitPriceUoms!: OptionToDropdown[];

  ngOnInit(): void {

    this.addSelections();
    this.separateByType();

    this.data ? this.destructureProjectConfigurations() : this.buildProjectTemplate();

  }

  private separateByType(): void {
    this.etrConcentrationUoms = this.uoms.filter(uom => uom.uomType === 'etr-concentration').map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
    this.pounderalPriceUoms = this.uoms.filter(uom => uom.uomType === 'pounderal-price').map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
    this.volumetricPriceUoms = this.uoms.filter(uom => uom.uomType === 'volumetric-price').map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
    this.unitPriceUoms = this.uoms.filter(uom => uom.uomType === 'unit-price').map(uom => { return { value: uom.longString, id: uom.uomId, disabled: false }; });
    this.etrs = this.materials.filter(material => material.type === 'etr').map(material => { return { value: material.longString, id: material.materialId, disabled: false }; });
  }

  private addSelections(): void {
    this.uoms.forEach(uom => uom.isSelected ?? false);
    this.materials.forEach(material => material.isSelected ?? false);
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

    //TODO build model constants for that element
    //TODO add to the economic variables
    const etr = this.materials.find(material => material.materialId === option.id);
    if (etr) { etr.isSelected = etr.isSelected ? false : true };

  }

  private closeModal(): void {
    this.dialogRef.close(this.data);
  }

  private buildProjectTemplate(): Project {
    return PROJECT;
  }

  private destructureProjectConfigurations(): void {
    this.data = this.data as { project: Project };
    this.projectName = this.data.project.longString;
    this.modelConstants = this.data.project.projectConfiguration.modelConstants;
    this.operationalVariable = this.data.project.projectConfiguration.operationalVariables;
    this.economicVariables = this.data.project.projectConfiguration.economicVariables;
  }


  private buildForms(): void {
    this.formBuilder.group({});
    const mock1 = new FormControl('', Validators.required);
    const mock2 = new FormGroup({});
  }


}
