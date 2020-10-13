import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { TestredirectComponent } from './testredirect/testredirect.component';
import { MsalB2CGuard } from '@whiteduck/msalb2c-angular';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalB2CGuard]
  },
  {
    path: 'testredirect',
    component: TestredirectComponent,
    canActivate: [MsalB2CGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalB2CGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
