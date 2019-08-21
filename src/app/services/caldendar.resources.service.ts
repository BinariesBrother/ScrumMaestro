import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ICalendar} from './dto/ICalendar';
import { ICalendarEvent } from './dto/ICalendarEvents';


@Injectable()
export class CaldendarResourcesService {
  constructor(private http: HttpClient) {
  }

  public getCalendars(): Promise<ICalendar[]> {
    const params: HttpParams = new HttpParams().append('showDeleted', 'false');
    return this.http.get('/users/me/calendarList', {params: params}).toPromise().then((result) => result['items']);
  }

  public getCalendarContent(calendar: ICalendar): Promise<ICalendarEvent[]> {
    const params: HttpParams = new HttpParams().append('showDeleted', 'false').append('calendarId', calendar.id);
    return this.http.get(`/calendars/${calendar.id}/events`, {params: params}).toPromise().then((result) => result['items']);
  }
}
