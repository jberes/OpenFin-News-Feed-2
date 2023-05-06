import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Financial } from './financial';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  public getData(tableName: string): Observable<any> {
    return of(Financial[tableName]);
  }
}
