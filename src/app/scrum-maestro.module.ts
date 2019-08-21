import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG
} from 'ng-gapi';
import {AppComponent} from './scrum-maestro.component';
import {SMGAuthService} from './smgapi/smg-auth.service';
import {CaldendarResourcesService} from './services/caldendar.resources.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorGoogle} from './global/interceptor-google';
import {
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatSliderModule, MatIconModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatCardModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChoixCalendrierComponent } from './widget/choix-calendrier/choix-calendrier.component';
import { HeaderComponent } from './widget/header/header.component';
import { ProfilCardComponent } from './widget/profil-card/profil-card.component';
import { EventComponent } from './widget/event/event.component';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '285381600468-1d4qo7qoiaveqjae74m82nj8bcqfidjs.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/tasks'
  ].join(' ')
};

@NgModule({
  declarations: [
    AppComponent,
    ChoixCalendrierComponent,
    HeaderComponent,
    ProfilCardComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [SMGAuthService, CaldendarResourcesService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorGoogle,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class ScrumMaestroModule {
}
