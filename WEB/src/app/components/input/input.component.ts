import { FormGroup } from '@angular/forms';
import { InputField } from './../../contracts/Classes/InputField';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() properties!: InputField;
  @Input() form!: FormGroup;
  valueType!: 'number' | 'string';

  constructor() { }

  ngOnInit(): void {
    this.valueType = typeof (this.properties.value) as 'string' | 'number';
  }

}
