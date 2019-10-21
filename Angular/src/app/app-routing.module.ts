import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';




const routes: Routes = [
  {
    path: 'inscription', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]

  },
  {
    path: 'connexion', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'profil', component: ProfilComponent,canActivate:[AuthGuard]
  },
  {
    path: '', redirectTo: '/connexion', pathMatch: 'full'
  },
  {
    path: 'contact', component: ContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
