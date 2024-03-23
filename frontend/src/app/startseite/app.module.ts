import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


import { StartseiteComponent } from './startseite.component';
import { EintraegeComponent } from '../eintraege/eintraege.component';
import { NavComponent } from '../nav/nav.component';
import { AppComponent } from '../app.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StartseiteComponent,
    EintraegeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      { path: 'startseite', component: StartseiteComponent },
      { path: 'eintraege', component: EintraegeComponent },

      { path: '', redirectTo: '/startseite', pathMatch: 'full' },

      { path: '**', redirectTo: '/startseite' }
    ]),
    BrowserAnimationsModule

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
