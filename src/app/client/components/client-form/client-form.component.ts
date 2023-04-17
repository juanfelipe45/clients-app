import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientSearch } from 'src/app/interfaces/clientRequest.interface';
import { RegexValidators } from 'src/app/shared/constants/RegexValidators';
import { DatePipe } from '@angular/common';

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

  constructor(private datePipe: DatePipe) {
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
    this.activeAdvancedSearch = false;
    this.emitFormEvent.emit(requets);
  }

  private generateRequest(): ClientSearch {
    return {
      sharedKey: this.clienSearchGroup.value.sharedKey,
      name: this.activeAdvancedSearch ? this.clienSearchGroup.value.name : null,
      email: this.activeAdvancedSearch ? this.clienSearchGroup.value.email : null,
      phone: this.activeAdvancedSearch ? this.clienSearchGroup.value.phone : null,
      fromCreationDate: this.activeAdvancedSearch ? this.datePipe.transform(this.clienSearchGroup.value.startDate, 'dd/MM/yyyy') : null,
      toCreationDate: this.activeAdvancedSearch ? this.datePipe.transform(this.clienSearchGroup.value.endDate, 'dd/MM/yyyy') : null
    }
  }

}
