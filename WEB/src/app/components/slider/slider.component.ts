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

  constructor() { }

  ngOnInit(): void {

  }

  onChangeValue(): void {

    this.changeValueEvent.emit(this.params);

  }

}
