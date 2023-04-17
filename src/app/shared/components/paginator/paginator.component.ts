import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'client-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent {

  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>();

  changePage(pageEvent: PageEvent) {
    this.onChangePage.emit(pageEvent.pageIndex);
  }

}
