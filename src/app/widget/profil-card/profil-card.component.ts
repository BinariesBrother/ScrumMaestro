import { Component, OnInit, Input } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'scrum-maestro-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {

  @Input() user: GoogleUser;

  constructor() { }

  ngOnInit() {
  }

  public defaultProfileUrl(): string {
    return 'assets/profile.png';
  }

  public setDefault(elt){
    elt.src = this.defaultProfileUrl();
  }

}
