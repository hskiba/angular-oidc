import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      const state = params.get('state');

      if (code && state) {
        const queryParams = new HttpParams().set('code', code).set('state', state);
        this.http.get('http://127.0.0.1:8000/oauth/vault/callback', {
          params: queryParams,
          withCredentials: true,
          responseType: 'text' // set the response type as text
        }).subscribe(() => {
          this.router.navigate(['/home']);
        }, (error) => {
          console.error('Error during HTTP request: ', error);
        });
      }
    });
  }

}
