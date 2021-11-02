import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.scss']
})
export class ButtonSaveComponent implements OnInit {

  @Output() saveConfigurationsEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  public onClickSave(): void {

    this.saveConfigurationsEvent.emit();

  }

}
