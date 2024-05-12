import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, interval, of } from 'rxjs'
import {environment} from "../../../environments/environment";
import {formatDate} from "date-fns";

interface CurrencyRates {
  quotes: {
    [key: string]: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor (private http: HttpClient) {}

  getCurrencyData (currencies: string[]): Observable<any> {
    if (currencies.length > 0) {
      return this.http.get(`https://api.currencybeacon.com/v1/latest?api_key=${environment.key}&base=RUB&symbols=${currencies.join(',')}`)
    } else {
      return of({ rates: {} })
    }
  }

  getPrevCurrencyData(): Observable<any> {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const yesterdayDate = formatDate(currentDate, 'yyyy-MM-dd');

    return this.http.get<any>(`https://api.currencybeacon.com/v1/historical?api_key=${environment.key}&base=RUB&symbols=USD,EUR,GBP,CNY,JPY,TRY&date=${yesterdayDate}`);
  }
}
