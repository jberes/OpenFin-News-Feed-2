import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakePendingOrdersService {
  constructor(
    private http: HttpClient
  ) { }

  public getPendingOrders(): Observable<any> {
    return this.http.get("https://excel2json.io/api/share/d9eb32b2-601a-49cd-4a6b-08db39d60f55");
  }
}
