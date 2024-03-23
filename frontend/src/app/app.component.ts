import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EintraegeComponent } from './eintraege/eintraege.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartseiteComponent, MatFormFieldModule, MatInputModule, 
    MatSelectModule, EintraegeComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'frontend';
}
