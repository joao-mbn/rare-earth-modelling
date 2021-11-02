import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-run',
  templateUrl: './button-run.component.html',
  styleUrls: ['./button-run.component.scss']
})
export class ButtonRunComponent implements OnInit {

  @Output() runSimulationEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClickRun(): void {

    this.runSimulationEvent.emit();

  }

}
