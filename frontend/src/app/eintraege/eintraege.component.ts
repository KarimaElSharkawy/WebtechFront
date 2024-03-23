import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service'; 
import { MatTableModule } from '@angular/material/table';
import { Eintraege } from '../shared/eintraege';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Eintrag {
  id: number;
  datum: string;
  eintraege: string;
}

@Component({
  selector: 'app-eintraege',
  standalone: true,
  imports: [MatTableModule,CommonModule, HttpClientModule], 
  templateUrl: './eintraege.component.html',
  styleUrls: ['./eintraege.component.css'] 
})
export class EintraegeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'datum', 'eintraege']; 
  dataSource: Eintraege[] = []; 

  ngOnInit(): void {
    this.readAllEintraege(); 
  }
  
  bs = inject(BackendService); 

  readAllEintraege() {
    this.bs.getAllEntries().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = response; 
      },
      error: (err) => console.log(err),
      complete: () => console.log('Abrufen aller Einträge abgeschlossen')
    });
  }

  deleteEntry(id: number) {
    console.log(`Löschen des Eintrags mit ID: ${id}`);
    
  }
}
