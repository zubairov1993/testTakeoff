import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
    { path: 'contacts', component: ContactsPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
