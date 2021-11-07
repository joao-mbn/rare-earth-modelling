import { OperationalVariable } from '../../classes/OperationalVariable';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() params!: OperationalVariable;
  @Output() changeValueEvent = new EventEmitter<OperationalVariable>();
  value!: number | null;
  rangeValue!: number[] | null;

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
      this.params.value = this.rangeValue;
    } else {
      this.params.value = this.value;
    }
    this.changeValueEvent.emit(this.params);

  }

  public isRangeSlider(): boolean {

    return typeof (this.params.value) === 'object';

  }

}
