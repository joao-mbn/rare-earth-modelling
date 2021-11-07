import { OperationalVariables } from '../../classes/OperationalVariables';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() params!: OperationalVariables;
  @Output() changeValueEvent = new EventEmitter<OperationalVariables>();
  value: number | null = 1;
  rangeValue: number[] | null = [0.5, 1.5];

  constructor() { }

  ngOnInit(): void {

    if (this.isRangeSlider()) {
      this.value = this.params.value as number;
    } else {
      this.rangeValue = this.params.value as number[];
    }

  }

  public onChangeValue(): void {

    if (this.isRangeSlider()) {
      this.params.value = this.value;
    } else {
      this.params.value = this.rangeValue;
    }
    this.changeValueEvent.emit(this.params);

  }

  public isRangeSlider(): boolean {

    return typeof (this.params.value) === 'object';

  }

}
