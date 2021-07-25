import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-etr-template',
  templateUrl: './etr-template.component.html',
  styleUrls: ['./etr-template.component.scss']
})
export class EtrTemplateComponent implements OnInit {

  @Input() nome?: string;
  @Input() Z?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
