import { Component, OnInit, Input } from '@angular/core';
import { ICalendarEvent } from 'src/app/services/dto/ICalendarEvents';

@Component({
  selector: 'scrum-maestro-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: ICalendarEvent;

  constructor() { }

  ngOnInit() {
    console.log(this.event);
  }

}
