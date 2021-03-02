import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Contact, FbAuthResponse, User } from "src/app/shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()
  public apiKey: string = 'AIzaSyCs1hZlyxHM359QhKNd8ZDBHOSZt1PJSfE'

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    const expData = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expData) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, user)
     .pipe(
       tap(this.setToken),
       catchError(this.handleError.bind(this))
    )
  }

  logout() {
    this.setToken(null)
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch(message) {
      case 'INVALID_EMAIL':
        this.error$.next('Невнрный email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный password')

        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break;
    }

    return throwError(error)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const localData: Array<Contact[]> = []
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('localData', JSON.stringify(localData))
    } else {
      localStorage.clear()
    }

  }
}
