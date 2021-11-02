import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() clickEvent = new EventEmitter();
  @Input() buttonName?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(): void {

    this.clickEvent.emit();

  }

}
