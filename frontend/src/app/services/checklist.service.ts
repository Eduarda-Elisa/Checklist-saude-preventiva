import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checklist, ChecklistItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private apiUrl = 'http://localhost:3000/api/checklists';

  constructor(private http: HttpClient) {}

  createChecklist(userId: string): Observable<Checklist> {
    return this.http.post<Checklist>(this.apiUrl, { userId });
  }

  getChecklistByUser(userId: string): Observable<Checklist> {
    return this.http.get<Checklist>(`${this.apiUrl}/user/${userId}`);
  }

  updateChecklistItem(checklistId: string, itemId: string, data: Partial<ChecklistItem>): Observable<Checklist> {
    return this.http.put<Checklist>(`${this.apiUrl}/${checklistId}/items/${itemId}`, data);
  }

  updateChecklist(checklistId: string, data: Partial<Checklist>): Observable<Checklist> {
    return this.http.put<Checklist>(`${this.apiUrl}/${checklistId}`, data);
  }

  regenerateChecklist(userId: string): Observable<Checklist> {
    return this.http.post<Checklist>(`${this.apiUrl}/regenerate/${userId}`, {});
  }
}
