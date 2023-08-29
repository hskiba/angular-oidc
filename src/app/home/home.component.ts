import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public apiResponse: any; // To hold the JSON response

  constructor(private http: HttpClient) {}

  callAPI(endpoint: string) {
    return this.http.get(`http://localhost:8000${endpoint}`, {
      withCredentials: true,
    });
  }

  handleApiCall(endpoint: string) {
    this.callAPI(endpoint).subscribe(
      (response) => (this.apiResponse = response), // Set the response to the apiResponse variable
      (error) => console.error(error),
    );
  }

  logout() {
    this.http
      .get(`http://localhost:8000/logout/`, {
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe(() => window.location.reload());
  }
}
