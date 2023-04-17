import { Component } from '@angular/core';

@Component({
  selector: 'client-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent {
  public messageToConfirm = 'Are you sure?';
}
