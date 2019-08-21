import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material';

export enum ConnectionStateEnum {
  UNCONNECTED = 'UNCONNECTED',
  CONNECTED = 'CONNECTED',
  WAITING = 'WAITING',
  INIT = 'INIT'
}

@Component({
  selector: 'scrum-maestro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public state: ConnectionStateEnum;
  @Output() public connection = new EventEmitter<any>();
  @Output() public disconnection = new EventEmitter<any>();

  @ViewChild(MatDrawer, {static: false}) snav: MatDrawer;

  constructor() { }

  ngOnInit() {
  }

  public close() {
    this.snav.close();
  }

  public open() {
    this.snav.open();
  }

  toggle() {
    this.snav.toggle();
  }

  public connect() {
    this.connection.emit(null);
  }

  public disconnect() {
    this.disconnection.emit(null);
  }

  public get isConnected(): boolean {
    return this.state === ConnectionStateEnum.CONNECTED;
  }

  public get isUnConnected(): boolean {
    return this.state === ConnectionStateEnum.UNCONNECTED;
  }

  public get isWaiting(): boolean {
    return this.state === ConnectionStateEnum.WAITING;
  }

}
