import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { EintraegeComponent } from './eintraege/eintraege.component';
import { NgModule } from '@angular/core';
import { ProfielComponent } from './profiel/profiel.component';


export const routes: Routes = [
  { path: 'startseite', component: StartseiteComponent },
  { path: 'profiel', component: ProfielComponent },
  { path: 'eintraege', component: EintraegeComponent },
  { path: '', redirectTo: '/startseite', pathMatch: 'full' },
  { path: '**', redirectTo: '/startseite' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }