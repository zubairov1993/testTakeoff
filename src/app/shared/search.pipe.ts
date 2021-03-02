import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from "src/app/shared/interfaces";

@Pipe({
  name: 'searchContacts'
})
export class SearchPipe implements PipeTransform {
  transform(contacts: Contact[], search = ''): Contact[] {
    if(!search.trim()) {
      return contacts
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(search.toLowerCase())
    })
  }
}
