import { Component, ContentChildren, Input, QueryList, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { MetaColumn } from 'src/app/interfaces/metacolumn.interface';

@Component({
  selector: 'client-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnChanges {

  public listFields: any[] = [];

  @Input() public dataSource: any[] = [];
  @Input() public metaColumns: MetaColumn[] = [];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ContentChildren(MatColumnDef, { descendants: true }) columnsDef!: QueryList<MatColumnDef>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaColumns']) {
      console.log('metaColumns', this.metaColumns);
      this.listFields = this.metaColumns.map((el) => el.field);
    }
  }

  ngAfterContentInit() {
    console.log('columnsDef', this.columnsDef);
    if (!this.columnsDef) {
      return;
    }

    this.columnsDef.forEach((columnDef) => {
      console.log('columnDef', columnDef);
      this.listFields.push(columnDef.name);
      this.table.addColumnDef(columnDef);
    });
  }

}
