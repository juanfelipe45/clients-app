import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClientRoutingModule } from './client-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http/http.service';
import { UtilsService } from '../services/util/utils.service';
import { ClientSaveComponent } from './components/client-save/client-save.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientFormComponent,
    ClientSaveComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    UtilsService,
    DatePipe
  ]
})
export class ClientModule { }
