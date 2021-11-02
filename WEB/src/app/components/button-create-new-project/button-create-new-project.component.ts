import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-create-new-project',
  templateUrl: './button-create-new-project.component.html',
  styleUrls: ['./button-create-new-project.component.scss']
})
export class ButtonCreateNewProjectComponent implements OnInit {

  @Output() createNewProjectEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClickCreateNewProject(): void {

    this.createNewProjectEvent.emit();

  }

}
