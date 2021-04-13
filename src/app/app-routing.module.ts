import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardInspirationComponent } from './standard-inspiration/standard-inspiration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LicenseInfoComponent } from './license-info/license-info.component';

const routes: Routes = [
  { path: 'standard', component: StandardInspirationComponent },
  { path: '',   redirectTo: '/standard', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent},
  { path: 'license', component: LicenseInfoComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
