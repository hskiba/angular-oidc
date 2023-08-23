import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // adjust path

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  providers: { key: string; name: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoginProviders().subscribe((data) => {
      this.providers = Object.keys(data).map((key) => ({
        key,
        name: data[key],
      }));
    });
  }

  login(providerKey: string) {
    const redirectUri = encodeURIComponent('http://localhost:4200/' + providerKey + '/callback');

    this.authService
      .getLoginUri(providerKey, redirectUri)
      .subscribe((response) => {
        if (response.uri) {
          console.log(response.uri);
          window.location.href = response.uri;
        }
      });
  }
}
