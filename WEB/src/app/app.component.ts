import { Component, OnInit } from '@angular/core';
import * as mocks from '../mocks/project';
import { ElementProperties } from './contracts/Interfaces/ElementProperties';
import { Material } from './contracts/Interfaces/Material';
import { OperationalVariable } from './contracts/Interfaces/OperationalVariable';
import { ProjectConfiguration } from './contracts/Interfaces/ProjectConfiguration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'etrs';

  doConsoleLog(): void {

    const materials: Material[] = mocks.MATERIALS;
    const modelConstants: ElementProperties[] = mocks.MODEL_CONSTANTS;
    const OperationalVariableArray: OperationalVariable[] = mocks.OPERATIONAL_VARIABLES_RANGES;
    const projectConfiguration: ProjectConfiguration = mocks.PROJECT_CONFIGURATION;

    console.log(JSON.stringify(mocks.PROJECT));
  }

  ngOnInit(): void {

    /* this.doConsoleLog(); */

  }

}
