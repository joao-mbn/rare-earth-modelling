import { Component, OnInit } from '@angular/core';
import * as mocks from '../mocks/mocks';
import { ElementProperties } from './classes/ElementProperties';
import { Material } from './classes/Material';
import { MaterialType } from './classes/MaterialType';
import { OperationalVariable } from './classes/OperationalVariable';
import { PhysChemProperty } from './classes/PhysChemProperty';
import { Summary } from './classes/Summary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'etrs';

  doConsoleLog(): void {

    const materials: Material[] = mocks.MATERIALS;
    const physChemProperties: PhysChemProperty[] = mocks.PHYSQUEM_PROPERTIES;
    const materialTypes: MaterialType[] = mocks.MATERIAL_TYPES;
    const economicVariables: Material[] = mocks.MATERIALS;
    const modelConstants: ElementProperties[] = mocks.MODEL_CONSTANTS;
    const OperationalVariableArray: OperationalVariable[] = mocks.OPERATIONAL_VARIABLES_RANGES;
    const summary: Summary = mocks.SUMMARY;

    console.log(JSON.stringify(mocks.PROJECT_CONFIGURATIONS));
  }

  ngOnInit(): void {

    /* this.doConsoleLog(); */

  }

}
