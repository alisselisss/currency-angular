import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { CurrencyState } from '../../store/reducers/currency.reducers'
import { selectRates } from '../../store/selectors/currency.selectors'
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from '@angular/material/table'
import { CommonModule, NgIf } from '@angular/common'
import { loadCurrencyRates, addCurrency, removeCurrency } from '../../store/actions/currency.actions'
import { MatButton, MatIconButton } from '@angular/material/button'
import { Subscription } from 'rxjs'
import { MatIcon } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { AddCurrencyDialogComponent } from '../add-currency-dialog/add-currency-dialog.component'
import { DeleteCurrencyDialogComponent } from '../delete-currency-dialog/delete-currency-dialog.component'
import { CdkHeaderRow } from '@angular/cdk/table'
import {CurrencyService} from "../../services/currency/currency.service";

@Component({
  selector: 'app-currency-rates',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    NgIf,
    MatHeaderRow,
    MatRow,
    CommonModule,
    MatTableModule,
    MatColumnDef,
    MatButton,
    MatIcon,
    MatIconButton,
    CdkHeaderRow
  ],
  templateUrl: './currency-rates.component.html',
  styleUrl: './currency-rates.component.scss'
})
export class CurrencyRatesComponent implements OnInit {
  currencyRatesSubscription!: Subscription
  currencyRates: any;
  currentDateTime!: string
  previousCurrencyRates: { [key: string]: number } = {}

  constructor (private store: Store<CurrencyState>,
               public dialog: MatDialog,
               private currencyService: CurrencyService) {
  }

  ngOnInit (): void {
    this.currencyService.getPrevCurrencyData().subscribe(previousCurrencyRates => {
      this.previousCurrencyRates = previousCurrencyRates.rates
    })

    this.updateDateTime()
    setInterval(() => {
      this.updateDateTime()
    }, 1000)

    this.currencyRatesSubscription = this.store.pipe(select(selectRates)).subscribe(newCurrencyRates => {
      const formattedNewRates = Object.entries(newCurrencyRates).map(([currency, rate]) => ({ currency, rate }));

      formattedNewRates.forEach(({ currency, rate }) => {
        const rateFiveSecondsAgo = this.currencyRates.find((prevCurrency: any) => prevCurrency.currency === currency)?.rate
        if (rateFiveSecondsAgo && rate !== rateFiveSecondsAgo) {
          this.previousCurrencyRates[currency] = rateFiveSecondsAgo;
        }
      });

      this.currencyRates = formattedNewRates;
    });
  }

  updateDateTime (): void {
    const date = new Date()
    this.currentDateTime = date.toLocaleString()
  }

  openAddCurrencyDialog (): void {
    const dialogRef = this.dialog.open(AddCurrencyDialogComponent, {
      width: '300px',
      data: { currencies: this.currencyRates.map((currency: any) => currency.currency) }
    })

    dialogRef.afterClosed().subscribe(selectedCurrency => {
      if (selectedCurrency) {
        this.store.dispatch(addCurrency({ currency: selectedCurrency.toUpperCase() }))
        this.store.dispatch(loadCurrencyRates())
      }
    })
  }

  openDeleteCurrencyDialog (): void {
    const dialogRef = this.dialog.open(DeleteCurrencyDialogComponent, {
      width: '300px',
      data: { currencies: this.currencyRates.map((currency: any) => currency.currency) }
    })

    dialogRef.afterClosed().subscribe(selectedCurrency => {
      if (selectedCurrency) {
        this.store.dispatch(removeCurrency({ currency: selectedCurrency.toUpperCase() }))
        this.store.dispatch(loadCurrencyRates())
      }
    })
  }
}
