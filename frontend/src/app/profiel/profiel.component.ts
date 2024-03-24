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
import { Eintraege } from '../shared/eintraege';
import { BackendService } from '../shared/backend.service';
import { FormsModule } from '@angular/forms';

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
    CommonModule
  ]
})
export class ProfielComponent implements OnInit {
  profile: any = {};
  profileSaved = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.backendService.getUserProfile().subscribe({
      next: (profiel) => {
        this.profile = profiel;
      },
      error: (err) => console.error('Fehler beim Laden des Benutzerprofils:', err),
    });
  }

  saveProfile() {
    this.backendService.createUserProfile(this.profile).subscribe({
      next: () => {
        console.log('Profil gespeichert');
        this.profileSaved = true;
      },
      error: (err) => console.error('Fehler beim Speichern des Profils:', err)
    });
  }
}