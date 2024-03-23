import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BackendService } from '../shared/backend.service'; 
import { Eintraege } from '../shared/eintraege';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eintraege',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './eintraege.component.html',
  styleUrls: ['./eintraege.component.css']
})
export class EintraegeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'eintraege', 'datum', 'delete'];
  dataSource: Eintraege[] = [];

  constructor(private bs: BackendService) {} 

  ngOnInit(): void {
    this.readAllEintraege();
  }

  readAllEintraege() {
    this.bs.getAllEntries().subscribe({
      next: (response) => {
        this.dataSource = response; 
      },
      error: (err) => console.error('Fehler beim Abrufen der Einträge:', err),
      complete: () => console.log('Abrufen aller Einträge abgeschlossen')
    });
  }

  deleteEntry(id: number) {
    this.bs.deleteEntry(id).subscribe({
      next: () => {
        console.log(`Eintrag mit ID ${id} wurde gelöscht.`);

        this.dataSource = this.dataSource.filter(eintrag => eintrag.id !== id);
        this.readAllEintraege(); 
      },
      error: (err) => console.error('Fehler beim Löschen des Eintrags:', err)
    });
  }
}