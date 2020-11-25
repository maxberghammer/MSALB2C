import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiCallComponent } from './apicall/apicall.component';
import { HomeComponent } from './home/home.component';
import { TestredirectComponent } from './testredirect/testredirect.component';
import { MsalB2CGuard } from '@whiteduck/msalb2c-angular';

const routes: Routes = [
  {
    path: 'apicall',
    component: ApiCallComponent,
    canActivate: [MsalB2CGuard] // Secured by MsalB2CGuard
  },
  {
    path: 'testredirect',
    component: TestredirectComponent,
    canActivate: [MsalB2CGuard] // Secured by MsalB2CGuard
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalB2CGuard] // Uncomment this to test securing the start-page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
