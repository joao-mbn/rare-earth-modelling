import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() label!: string;
  @Input() options!: (number | string)[];

  @Output() onSelectEvent = new EventEmitter<number | string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(option: number | string): void {

    this.onSelectEvent.emit(option);

  }

}
