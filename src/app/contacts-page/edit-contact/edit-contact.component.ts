import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  public form: FormGroup
  constructor(
    private readonly dialogRef: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: Contact,
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      phone: new FormControl(this.data.phone),
      email: new FormControl(this.data.email, [Validators.email])
    });
  }

  public editContact(): void {
    this.dialogRef.close({
      ...this.data,
      ...this.form.value
    } as Contact)
  }

  public cancelDialog(): void {
    this.dialogRef.close()
  }

}
