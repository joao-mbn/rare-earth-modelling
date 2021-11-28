import { InputField } from './../../contracts/Classes/InputField';
import { OperationalVariable } from '../../contracts/Interfaces/OperationalVariable';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() properties!: InputField;
  @Input() form!: FormGroup;
  @Output() changeValueEvent = new EventEmitter<InputField>();
  value!: number | null;
  rangeValue!: number[] | null;

  constructor() { }

  ngOnInit(): void {

    if (this.isRangeSlider()) {
      this.value = this.properties.value as number;
    } else {
      this.rangeValue = this.properties.value as number[];
    }

  }

  public onChangeValue(): void {

    if (this.isRangeSlider()) {
      this.properties.value = this.rangeValue as number[];
    } else {
      this.properties.value = this.value as number;
    }
    this.changeValueEvent.emit(this.properties);

  }

  public isRangeSlider(): boolean {

    return typeof (this.properties.value) === 'object';

  }

}
