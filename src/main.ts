import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ScrumMaestroModule} from './app/scrum-maestro.module';
import {environment} from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ScrumMaestroModule)
  .catch(err => console.log(err));
