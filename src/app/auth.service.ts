import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<{ is_authenticated: boolean }>(this.API_URL + '/check-session/', {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.is_authenticated),
        catchError((error: any) => {
          console.error('Session check failed', error);
          return of(false);
        }),
      );
  }

  getLoginProviders() {
    return this.http.get<{ [key: string]: string }>(this.API_URL + '/oauth/');
  }

  getLoginUri(providerKey: string, redirectUri: string) {
    return this.http.get<{ uri: string }>(
      `${this.API_URL}/oauth/${providerKey}/login?format=json&redirect_uri=${redirectUri}`,
      { withCredentials: true },
    );
  }
}
