import { hasKey } from 'src/app/utils/hasKey';
import { SummaryOperationalVariable } from './../../classes/OperationalVariable';
import { Summary } from './../../classes/Summary';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() summary!: Summary;
  operationalVariables!: SummaryOperationalVariable[];
  uomByMaterialTypesAsObject: { [materialType: string]: { [physChemProperty: string]: string } } = {};
  uomByMaterialTypesAsArray: { [materialType: string]: { physChemProperty: string, name: string, value: number | string | null, uom: string }[] } = {};

  constructor() { }

  ngOnInit(): void {

    this.organizeSummary();

  }

  private organizeSummary(): void {
    this.relateUomToMaterialType();
    this.operationalVariables = this.summary.operationalVariables;
  }

  private relateUomToMaterialType(): void {
    this.summary.materialTypes.forEach(materialType => {

      let array: { physChemProperty: string, name: string, value: number | string | null, uom: string }[] = [];
      this.uomByMaterialTypesAsObject[materialType.type] = {};

      materialType.physChemProperties?.forEach(physChemProperty => {
        this.uomByMaterialTypesAsObject[materialType.type][physChemProperty.shortString] = physChemProperty.uomLongString
        array.push({
          physChemProperty: physChemProperty.shortString,
          name: physChemProperty.name,
          value: physChemProperty.value,
          uom: physChemProperty.uomLongString
        });
      })

      Object.assign(this.uomByMaterialTypesAsArray, { [materialType.type]: array });
    })

  }

}
