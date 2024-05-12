import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { CurrencyState } from './store/reducers/currency.reducers'
import { loadCurrencyRates } from './store/actions/currency.actions'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Yadro'

  constructor (private store: Store<CurrencyState>) {}

  ngOnInit () {
    this.store.dispatch(loadCurrencyRates())
  }
}
