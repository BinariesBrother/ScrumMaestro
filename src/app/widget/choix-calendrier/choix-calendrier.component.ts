import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { ICalendar } from '../../services/dto/ICalendar';

@Component({
  selector: 'scrum-maestro-choix-calendrier',
  templateUrl: './choix-calendrier.component.html',
  styleUrls: ['./choix-calendrier.component.scss']
})
export class ChoixCalendrierComponent implements OnInit {

  @Input() public calendriers: ICalendar[];

  @Output('calendrierChange') public selectionEvent = new EventEmitter<ICalendar>();

  public selected;

  constructor() {
  }

  ngOnInit(): void {
  }

  public selectionChange(calendrier: ICalendar): void {
    this.selectionEvent.emit(calendrier);
  }
}
