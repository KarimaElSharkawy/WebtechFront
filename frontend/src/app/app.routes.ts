import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { ProfilComponent } from './profil/profil.component';
import { EintraegeComponent } from './eintraege/eintraege.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path: 'startseite', component: StartseiteComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'eintraege', component: EintraegeComponent }
  ];


