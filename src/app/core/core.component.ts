import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'client-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.sass']
})
export class CoreComponent {

  public mode: MatDrawerMode = 'over'
  public autosize: boolean = true;
  public hasBackdrop: boolean = true;

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.mode = 'over';
        this.hasBackdrop = true;
        this.autosize = true;
      } else {
        this.mode = 'side';
        this.hasBackdrop = false;
        this.autosize = false;
      }
    });
  }
}
