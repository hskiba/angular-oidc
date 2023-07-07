import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
      this.http.get<{ uri: string }>(`http://127.0.0.1:8000/oauth/vault/login?format=json&redirect_uri=${encodeURIComponent('http://localhost:4200/callback')}`,
          { withCredentials: true }).subscribe(response => {
              if (response.uri) {
                  window.location.href = response.uri;
              }
          });
  }

}
