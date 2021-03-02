import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Contact } from '../shared/interfaces';
import { ContactsService } from '../shared/services/contacts.service';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements DoCheck {

  public contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([])
  public gSub: Subscription
  public eSub: Subscription
  public dSub: Subscription
  public searchStr = ''

  constructor(
    private contactsService: ContactsService,
    public dialog: MatDialog,
  ) {}

  ngDoCheck(): void {
    this.gSub = this.contactsService.getAll.subscribe(data => this.contacts$.next(data))
  }

  createContact(): void {
    this.dSub = this.dialog.open(CreateContactComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.contactsService.createContact(data)
        }
      })
  }

  editContact(id: string): void {
    const data = this.contacts$.value.find((contact: Contact) => contact.id == id)
    this.eSub = this.dialog.open(EditContactComponent, {
      data: {
        ...data
      }
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.contactsService.editContact(data)
        }
      })
  }

  removeContact(id: string) {
    this.contactsService.removeContact(id)
  }

  ngOnDestroy() {
    if(this.gSub) {
      this.gSub.unsubscribe()
    }
    if(this.eSub) {
      this.eSub.unsubscribe()
    }
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
