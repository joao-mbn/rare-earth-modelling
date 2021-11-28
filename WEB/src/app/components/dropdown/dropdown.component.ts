import { FormGroup } from '@angular/forms';
import { OptionToDropdown } from '../../contracts/Interfaces/OptionToDropdown';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownField } from 'src/app/contracts/Classes/DropdownField';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() properties!: DropdownField;
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
