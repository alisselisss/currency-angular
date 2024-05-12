import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideClientHydration } from '@angular/platform-browser'
import { provideState, provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { CurrencyEffects } from './store/effects/currency.effects'
import { provideAnimations } from '@angular/platform-browser/animations'
import { currencyRatesReducer, currencyReducer } from './store/reducers/currency.reducers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideAnimations(),
    provideState({ name: 'rates', reducer: currencyRatesReducer }),
    provideState({ name: 'currencies', reducer: currencyReducer }),
    provideEffects(CurrencyEffects)
  ]
}
