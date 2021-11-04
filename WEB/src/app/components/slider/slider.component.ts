import { ParamsToSlider } from '../../classes/ParamsToSlider';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() params!: ParamsToSlider;
  @Output() changeValueEvent = new EventEmitter<ParamsToSlider>();
  value: number | null = 1;
  rangedValue: number | number[] | null = [0.5, 1.5];

  constructor() { }

  ngOnInit(): void {

    this.isRangeSlider();

  }

  public onChangeValue(): void {

    this.changeValueEvent.emit(this.params);

  }

  public isRangeSlider(): boolean {

    return typeof (this.params.value) === 'object';

  }

}
