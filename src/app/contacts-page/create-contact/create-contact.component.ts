import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  public form: FormGroup
  constructor(private readonly dialogRef: MatDialogRef<CreateContactComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email])
    })
  }

  public createContact(): void {
    this.dialogRef.close({
      ...this.form.value,
      id: new Date().getTime()
    } as Contact)
  }

  public cancelDialog(): void {
    this.dialogRef.close()
  }

}
