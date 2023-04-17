import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { KeypadComponent } from './components/keypad/keypad.component';



@NgModule({
  declarations: [
    TableComponent,
    ConfirmComponent,
    PaginatorComponent,
    KeypadComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    TableComponent,
    ConfirmComponent,
    MatDialogModule,
    PaginatorComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    KeypadComponent
  ]
})
export class SharedModule { }
