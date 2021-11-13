import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() label!: string;
  @Input() options!: { value: (number | string), id: number | string, disabled: boolean }[];
  @Input() multiple?: boolean;
  @Output() onSelectEvent = new EventEmitter<number | string>();
  value!: number | string;

  constructor() { }

  ngOnInit(): void {

  }

  /* workaround to prevent double emissions from onSelectionChange that may happen */
  onChanges(value: number | string): void {
    this.value = value;
  }

  onSelect(): void {
    this.onSelectEvent.emit(this.value);
  }

}
