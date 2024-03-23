import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { StartseiteComponent } from './startseite/startseite.component';
import { EintraegeComponent } from './eintraege/eintraege.component';
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { BackendService } from './shared/backend.service';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StartseiteComponent,
    EintraegeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BackendService,
    HttpClient,
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
