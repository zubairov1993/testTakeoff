import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Contact } from "../interfaces";

@Injectable({providedIn: 'root'})
export class ContactsService{

  createContact(data: Contact) {
    const dataStorage = JSON.parse(localStorage.getItem('localData'))
    dataStorage.push(data)
    localStorage.setItem('localData', JSON.stringify(dataStorage))
  }

  get getAll(): Observable<Contact[]> {
    return of(JSON.parse(localStorage.getItem('localData')))
  }

  removeContact(id: string) {
    const dataStorage = JSON.parse(localStorage.getItem('localData'))
    const data = dataStorage.filter(data => data.id != id)
    localStorage.setItem('localData', JSON.stringify(data))
  }

  editContact(newData: Contact) {
    const dataStorage = JSON.parse(localStorage.getItem('localData'))
    const updateContact = dataStorage.filter(data => data.id != newData.id)
    updateContact.push(newData)
    localStorage.setItem('localData', JSON.stringify(updateContact))
  }
}
