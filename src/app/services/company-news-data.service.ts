import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNewsDataService {
  constructor(
    private http: HttpClient
  ) { }

  public getNewsFeed(): Observable<any> {
    return this.http.get("https://excel2json.io/api/share/0854f54b-537f-4b7b-4a70-08db39d60f55");
  }
}
