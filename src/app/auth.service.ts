import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{is_authenticated: boolean}>('http://127.0.0.1:8000/check-session/', { withCredentials: true }).pipe(
      map(response => response.is_authenticated),
      catchError((error: any) => {
        console.error('Session check failed', error);
        return of(false);
      })
    );
  }
}
