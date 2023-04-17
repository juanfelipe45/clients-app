import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientSearch } from 'src/app/interfaces/clientRequest.interface';
import { RegexValidators } from 'src/app/shared/constants/RegexValidators';

@Component({
  selector: 'client-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.sass']
})
export class ClientFormComponent {

  public clienSearchGroup: FormGroup;
  public activeAdvancedSearch: boolean = false;

  @Output() public onErrorEvent: EventEmitter<string>  = new EventEmitter();;
  @Output() public emitFormEvent: EventEmitter<ClientSearch> = new EventEmitter();

  constructor() {
    this.clienSearchGroup = new FormGroup({
      sharedKey: new FormControl('', [Validators.pattern(RegexValidators.alphaNumericV2)]),
      name: new FormControl('', [Validators.pattern(RegexValidators.alphaAccentuation)]),
      email: new FormControl('', [Validators.pattern(RegexValidators.email)]),
      phone: new FormControl('', [Validators.pattern(RegexValidators.numeric)]),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  public onSubmit(): void {
    const requets = this.generateRequest();
    if (!this.validRequest(requets)) {
      this.onErrorEvent.emit('Form invalid');
      return;
    }

    this.emitFormEvent.emit(requets);
  }

  private generateRequest(): ClientSearch {
    return {
      sharedKey: this.clienSearchGroup.value.sharedKey,
      name: this.clienSearchGroup.value.name,
      email: this.clienSearchGroup.value.email,
      phone: this.clienSearchGroup.value.phone,
      fromCreationDate: this.clienSearchGroup.value.startDate,
      toCreationDate: this.clienSearchGroup.value.endDate
    }
  }

  private validRequest(request: ClientSearch): boolean {
    let isValid = false;
    const keys: string[] = Object.keys(request);

    for (let key of keys) {
      if (request[key as keyof ClientSearch]) {
        isValid = true;
      }
    }

    return isValid;

  }

}
