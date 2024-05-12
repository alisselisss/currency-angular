import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { HttpClient } from '@angular/common/http'
import { mergeMap, map, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators'
import { of, timer } from 'rxjs'

import * as CurrencyActions from '../actions/currency.actions'
import { CurrencyService } from '../../services/currency/currency.service'
import { select, Store } from '@ngrx/store'
import { CurrencyState } from '../reducers/currency.reducers'
import { selectCurrencies } from '../selectors/currency.selectors'

@Injectable()
export class CurrencyEffects {

  loadCurrencyRates$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActions.loadCurrencyRates),
    switchMap(() => timer(0, 5000).pipe(
      withLatestFrom(this.store.pipe(select(selectCurrencies))),
      map(([_, currencies]) => Object.values(currencies)),
      mergeMap((currencies) => this.currencyService.getCurrencyData(currencies).pipe(
        map((response: any) => CurrencyActions.loadCurrencyRatesSuccess({ rates: response.rates })),
        catchError(error => of(CurrencyActions.loadCurrencyRatesFailure({ error })))
      ))
    ))
  ))

  constructor (
    private actions$: Actions,
    private currencyService: CurrencyService,
    private store: Store<CurrencyState>
  ) {}

}
