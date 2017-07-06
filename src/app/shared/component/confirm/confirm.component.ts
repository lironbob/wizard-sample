import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmComponent>) {

  }

}
