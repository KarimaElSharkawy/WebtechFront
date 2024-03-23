import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eintraege } from './eintraege';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  deleteEntry(id: number) {
    throw new Error('Method not implemented.');
  }
  backendUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getAllEntries(): Observable<Eintraege[]> {
    let endpoint = '/eintraege'
    return this.http.get<Eintraege[]>(this.backendUrl + endpoint);
  }

  createOneEntry(eintrag: Eintraege): Observable<Eintraege> {
    let endpoint = '/startseite';
    return this.http.post<Eintraege>(this.backendUrl + endpoint, eintrag);
  }
}