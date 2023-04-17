import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  public showToggle: boolean = true;
  @Input() public isToggle: boolean = false;

  @Output() public isToggleButton: EventEmitter<boolean> = new EventEmitter();

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.showToggle = true;
        this.isToggle = false;
        this.isToggleButton.emit(this.isToggle);
      } else {
        this.showToggle = false;
        this.isToggle = true;
        this.isToggleButton.emit(this.isToggle);
      }
    });
  }

  public toggleButton(): void {
    this.isToggle = !this.isToggle;
    this.isToggleButton.emit(this.isToggle);
  }
}
