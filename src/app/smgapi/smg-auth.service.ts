import {Injectable} from '@angular/core';
import {GoogleApiService, GoogleAuthService} from "ng-gapi";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import {Observable, Observer} from "rxjs/Rx";

export interface AuthState {
  isConnected: boolean;
}

@Injectable()
export class SMGAuthService {

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private _user: GoogleUser;
  private auth: GoogleAuth;
  private _connectionEvent: Observable<GoogleUser>;
  private connectionEmitter: Observer<GoogleUser>;

  constructor(private gapiService: GoogleApiService, private googleAuth: GoogleAuthService) {
    this._connectionEvent = new Observable<GoogleUser>(observer => {
      this.connectionEmitter = observer;
    });
    this.gapiService.onLoad().subscribe(this.onLoad.bind(this));
  }

  public get user(): GoogleUser {
    return this._user;
  }

  public get connectionEvent() {
    return this._connectionEvent;
  }

  /**
   * Méthode appelée à l'initialisation de la google api.
   */
  public onLoad() {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        this.auth = auth;
        if (auth.isSignedIn) {
          this.signInSuccessHandler(auth.currentUser.get());
        }
      });
  }

  /**
   * Récupération du token de connection à la google api.
   * @returns {string} le token
   */
  public static getToken(): string {
    let token: string = sessionStorage.getItem(SMGAuthService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(SMGAuthService.SESSION_STORAGE_KEY);
  }

  /**
   * Méthode d'authentification google.
   */
  public signIn(): Promise<GoogleUser> {
    return this.auth.signIn().then(res => this.signInSuccessHandler(res));
  }

  /**
   * Déconnecte l'utilisateur courrant.
   */
  public disconnect(): void {
    if (this._user) {
      this._user.disconnect();
    }
    this._user = undefined;
    this.userChange();
  }

  private userChange() {
    this.connectionEmitter.next(this.user);
  }

  /**
   * Notification d'authentification google.
   * @param {GoogleUser} user le user authentifié
   */
  private signInSuccessHandler(user: GoogleUser): GoogleUser {
    this._user = user;
    sessionStorage.setItem(
      SMGAuthService.SESSION_STORAGE_KEY, user.getAuthResponse().access_token
    );
    this.userChange();
    return user;
  }
}
