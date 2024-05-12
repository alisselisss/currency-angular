import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatOption } from '@angular/material/autocomplete'
import { MatSelect } from '@angular/material/select'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-delete-currency-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf
  ],
  templateUrl: './delete-currency-dialog.component.html'
})

export class DeleteCurrencyDialogComponent {
  currencies: string[]
  selectedCurrency!: string

  constructor (
      public dialogRef: MatDialogRef<DeleteCurrencyDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { currencies: string[] }
  ) {
    this.currencies = data.currencies
  }

  onCancelClick (): void {
    this.dialogRef.close()
  }

  onDeleteClick (): void {
    this.dialogRef.close(this.selectedCurrency)
  }
}
