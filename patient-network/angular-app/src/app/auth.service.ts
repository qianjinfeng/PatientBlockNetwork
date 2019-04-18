import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private accessToken: string;

  constructor(public cookieService: CookieService, public http: Http) { }

  public getAccessToken(): string {
      this.accessToken = this.cookieService.get('access_token');
      if(!this.accessToken) {
          this.http.post('http://localhost:3000/api/users/login', { username: "username", password:"password" })
          .map((response: Response) => response.json() )
          .subscribe((response) => {// Display the result
            console.log('TJ user data', response);
            this.cookieService.set('access_token', response.id);
        });
        
    }

    return this.accessToken;
  }
}
