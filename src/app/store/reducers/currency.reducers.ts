import { ActionReducerMap, createReducer, on } from '@ngrx/store'
import { addCurrency, loadCurrencyRatesSuccess, removeCurrency } from '../actions/currency.actions'

export interface CurrencyState {
  rates: any[]
  currencies: string[]
}

export const initialState: CurrencyState = {
  rates: [],
  currencies: ['USD', 'EUR', 'GBP']
}

export const currencyRatesReducer = createReducer(
  initialState.rates,
  on(loadCurrencyRatesSuccess, (state, { rates }) => ({ ...[], ...rates }))
)

export const currencyReducer = createReducer(
  initialState.currencies,
  on(addCurrency, (state, { currency }) => [...state, currency]),
  on(removeCurrency, (state, { currency }) => state.filter(c => c !== currency))
)

export const reducers: ActionReducerMap<CurrencyState> = {
  rates: currencyRatesReducer,
  currencies: currencyReducer
}
