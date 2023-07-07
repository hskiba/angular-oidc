import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient) { }

  callAPI(endpoint: string) {
    this.http.get(`http://127.0.0.1:8000${endpoint}`, {
      withCredentials: true,
    }).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
}
}
