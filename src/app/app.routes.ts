import { Routes } from '@angular/router'
import { CurrencyRatesComponent } from './components/currency-rates/currency-rates.component'

export const routes: Routes = [
  { path: '', component: CurrencyRatesComponent, pathMatch: 'full' }
]
