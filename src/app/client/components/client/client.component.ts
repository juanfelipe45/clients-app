import { Component } from '@angular/core';
import { ClientResponse } from 'src/app/interfaces/clientResponse.interface';
import { MetaColumn } from 'src/app/interfaces/metacolumn.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilsService } from 'src/app/services/util/utils.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ClientSaveComponent } from '../client-save/client-save.component';

@Component({
  selector: 'client-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent extends BaseComponent<ClientResponse, ClientSaveComponent> {
  override listFields: string[] = [];
  override metaColumns: MetaColumn[] = [
    {field: 'sharedKey', title: 'Shared Key'},
    {field: 'name', title: 'Business ID'},
    {field: 'email', title: 'E-mail'},
    {field: 'phone', title: 'Phone'},
    {field: 'creationDate', title: 'Data Added'},
  ];

  constructor(private _httpService: HttpService, private _utilService: UtilsService) {
    super(ClientSaveComponent, "clients", _httpService, _utilService);
  }

}
