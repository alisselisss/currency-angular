import { createAction, props } from '@ngrx/store'

export const loadCurrencyRates = createAction('[Rates] Load Currency Rates')
export const loadCurrencyRatesSuccess = createAction('[Application] Load Currency Rates Success', props<{ rates: {[key: string]: number} }>())
export const loadCurrencyRatesFailure = createAction('[User] Load Currency Rates Failure', props<{ error: any }>())

export const addCurrency = createAction('[Currency] Add Currency', props<{ currency: string }>())
export const removeCurrency = createAction('[Currency] Remove Currency', props<{ currency: string }>())
