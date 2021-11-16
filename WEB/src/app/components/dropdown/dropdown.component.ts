import { OptionToDropdown } from './../../contracts/Interfaces/OptionsToDropdown';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() label!: string;
  @Input() options!: OptionToDropdown[];
  @Input() multiple?: boolean;
  @Output() onSelectEvent = new EventEmitter<OptionToDropdown>();
  option!: OptionToDropdown;

  constructor() { }

  ngOnInit(): void {

  }

  /* workaround to prevent double emissions from onSelectionChange that may happen */
  onChanges(option: OptionToDropdown): void {
    this.option = option;
  }

  onSelect(): void {
    this.onSelectEvent.emit(this.option);
  }

}
