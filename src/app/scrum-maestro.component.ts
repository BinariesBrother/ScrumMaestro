import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SMGAuthService} from './smgapi/smg-auth.service';
import {CaldendarResourcesService} from './services/caldendar.resources.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import GoogleUser = gapi.auth2.GoogleUser;
import {ICalendar} from './services/dto/ICalendar';
import { ICalendarEvent } from './services/dto/ICalendarEvents';
import { HeaderComponent, ConnectionStateEnum } from './widget/header/header.component';

@Component({
  selector: 'scrum-maestro-root',
  templateUrl: './scrum-maestro.component.html',
  styleUrls: ['./scrum-maestro.component.scss']
})
export class AppComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(HeaderComponent, {static: false}) header: HeaderComponent;

  private _isConnected = false;
  private _user: GoogleUser;
  public state: ConnectionStateEnum = ConnectionStateEnum.INIT;
  public isInit = false;
  public calendriers: ICalendar[] = [];
  public events: ICalendarEvent[] = [];

  constructor(public auth: SMGAuthService,
              private caldendarResourcesService: CaldendarResourcesService,
              private cChangeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.auth.connectionEvent.subscribe(this.userChange.bind(this));
    this.blockUI.start();
  }

  public getList() {
    this.caldendarResourcesService.getCalendars().then(array => this.setList(array));
  }

  public calendrierChange(calendrier: ICalendar) {
    this.blockUI.start();
    this.caldendarResourcesService.getCalendarContent(calendrier)
    .then(this.setCalendarEvent.bind(this))['finally'](this.blockUI.stop.bind(this));
    this.header.close();
  }

  public setCalendarEvent( events: ICalendarEvent[]) {
    this.events = events;
  }

  public disconnect() {
    this.auth.disconnect();
    this._user = undefined;
    this.setList([]);
    this.events = [];
    this.state = ConnectionStateEnum.UNCONNECTED;
    this.header.close();
  }

  public get isConnected() {
    return this._isConnected;
  }

  public get user() {
    return this._user;
  }

  public connection() {
    this.blockUI.start();
    this.state = ConnectionStateEnum.WAITING;
    this.auth.signIn().then((p) => {
      this.blockUI.stop();
    }).catch(() => {
      this.state = ConnectionStateEnum.UNCONNECTED;
    });
  }

  private userChange(user: GoogleUser) {
    this._isConnected = user && user.isSignedIn();
    if (this._isConnected) {
      this.getList();
      this._user = user;
      this.state = ConnectionStateEnum.CONNECTED;
    }
    if (!this.isInit) {
      this.isInit = true;
      this.blockUI.stop();
      if (!this._isConnected) {
        this.state = ConnectionStateEnum.UNCONNECTED;
      }
      this.cChangeDetectorRef.detectChanges();
    }
  }

  private setList(array: ICalendar[]) {
    this.calendriers = array;
    this.cChangeDetectorRef.detectChanges();
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
