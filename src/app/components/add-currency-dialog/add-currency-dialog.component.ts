import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'
import { MatButton } from '@angular/material/button'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-add-currency-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatFormFieldModule,
    MatDialogClose,
    NgForOf
  ],
  templateUrl: './add-currency-dialog.component.html'
})

export class AddCurrencyDialogComponent {
  currencies: string[]
  selectedCurrency!: string

  constructor (public dialogRef: MatDialogRef<AddCurrencyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { currencies: string[] }) {
    const allCurrencies = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY']
    this.currencies = allCurrencies.filter(currency => !data.currencies.includes(currency))
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  onAddClick (): void {
    this.dialogRef.close(this.selectedCurrency)
  }
}
