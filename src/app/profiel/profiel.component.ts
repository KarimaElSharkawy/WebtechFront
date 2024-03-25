import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-startseite',
  templateUrl: './profiel.component.html',
  styleUrl: './profiel.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    FormsModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class ProfielComponent implements OnInit {
  profile: any = {};
  profileSaved = false;
  profileLoaded = false;

  constructor(private backendService: BackendService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.backendService.getUserProfile().subscribe({
      next: (profile) => {

        this.profileLoaded = Object.keys(profile).length > 0;
        if (this.profileLoaded) {
          this.profile = profile;
        } else {
          console.log('Keine Profildaten vorhanden.');

        }
      },
      error: (err) => console.error('Fehler beim Laden des Benutzerprofils:', err),
    });
  }

  clearProfileData() {
    this.backendService.clearUserProfile().subscribe({
      next: () => {
        console.log('Alle Benutzerdaten wurden gelöscht.');
        this.profile = {};
        this.profileLoaded = false;
        this.snackBar.open('Benutzerdaten wurden gelöscht.', 'Schließen', {
          duration: 3000,
        });
      },
      error: (err) => console.error('Fehler beim Löschen der Benutzerdaten:', err),
    });
  }

  saveProfile() {
    this.backendService.createUserProfile(this.profile).subscribe({
      next: () => {
        console.log('Profiel gespeichert');
        this.profileSaved = true; 
        this.snackBar.open('Profiel aktualisiert', 'Schließen', {
          duration: 3000,
        });
        setTimeout(() => location.reload(), 3000); 
      },
      error: (err) => {
        console.error('Fehler beim Speichern des Profiels:', err);
        this.snackBar.open('Fehler beim Speichern des Profiels', 'Schließen', {
          duration: 3000,
        });
      }
    });
  }
}