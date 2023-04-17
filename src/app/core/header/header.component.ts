import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  private isToggle: boolean = false;

  @Output() public isToggleButton: EventEmitter<boolean> = new EventEmitter();

  public toggleButton(): void {
    this.isToggle = !this.isToggle;
    this.isToggleButton.emit(this.isToggle);
  }
}
