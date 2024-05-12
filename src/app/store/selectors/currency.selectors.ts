import { CurrencyState } from '../reducers/currency.reducers'

export const selectRates = (state: CurrencyState) => state.rates
export const selectCurrencies = (state: CurrencyState) => state.currencies
