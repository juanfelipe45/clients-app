import { Component, Output, EventEmitter, OnChanges, SimpleChanges, Input, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { ClientRequest } from 'src/app/interfaces/clientRequest.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegexValidators } from 'src/app/shared/constants/RegexValidators';
import { ClientResponse } from 'src/app/interfaces/clientResponse.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'client-client-save',
  templateUrl: './client-save.component.html',
  styleUrls: ['./client-save.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientSaveComponent implements OnInit {

  public clientSave: FormGroup;

  public title: string = '';

  @Output() public onErrorEvent: EventEmitter<string>  = new EventEmitter();;
  @Output() public emitFormEvent: EventEmitter<ClientRequest> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reference: MatDialogRef<ClientSaveComponent>
  ) {
    this.clientSave = new FormGroup({
      sharedKey: new FormControl('', [Validators.pattern(RegexValidators.alphaNumericV2)]),
      name: new FormControl('', [Validators.pattern(RegexValidators.alphaAccentuation)]),
      email: new FormControl('', [Validators.pattern(RegexValidators.email)]),
      phone: new FormControl('', [Validators.pattern(RegexValidators.numeric)]),
      creationDate: new FormControl(),
    });

    this.title = data ? 'EDIT' : 'ADD';
  }

  ngOnInit() {
    this.loadForm();
  }

  public onSubmit(): void {
    const requets = this.generateRequest();
    if (!this.validRequest(requets)) {
      this.onErrorEvent.emit('Form invalid');
      return;
    }

    this.emitFormEvent.emit(requets);
  }

  private generateRequest(): ClientRequest {
    return {
      sharedKey: this.clientSave.value.sharedKey,
      name: this.clientSave.value.name,
      email: this.clientSave.value.email,
      phone: this.clientSave.value.phone,
      creationDate: this.clientSave.value.creationDate
    }
  }

  private validRequest(request: ClientRequest): boolean {
    let isValid = false;
    const keys: string[] = Object.keys(request);

    for (let key of keys) {
      if (request[key as keyof ClientRequest]) {
        isValid = true;
      }
    }

    return isValid;

  }

  private loadForm(): void {
    this.clientSave = new FormGroup({
      sharedKey: new FormControl(this.data?.sharedKey, [Validators.required, Validators.pattern(RegexValidators.alphaNumericV2)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.pattern(RegexValidators.alphaAccentuation)]),
      email: new FormControl(this.data?.email, [Validators.required, Validators.pattern(RegexValidators.email)]),
      phone: new FormControl(this.data?.phone, [Validators.pattern(RegexValidators.numeric)])
    });
  }
}
