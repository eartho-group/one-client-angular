import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private auth: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.isConnected$.pipe(take(1));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.redirectIfUnauthenticated(state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.redirectIfUnauthenticated(state);
  }

  private redirectIfUnauthenticated(
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isConnected$.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.auth.connectWithRedirect({
            appState: { target: state.url },
          });
        }
      })
    );
  }
}
