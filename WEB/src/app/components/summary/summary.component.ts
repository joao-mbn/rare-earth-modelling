import { ProjectConfiguration } from '../../contracts/Interfaces/ProjectConfiguration';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() summary!: ProjectConfiguration;

  constructor() { }

  ngOnInit(): void { };

}
