import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'client-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.sass']
})
export class KeypadComponent {

  @Output() onAdd = new EventEmitter<void>();
  @Output() onExport = new EventEmitter<string>();

  add() {
    this.onAdd.emit();
  }

  export(type: string) {
    this.onExport.emit(type);
  }

}
