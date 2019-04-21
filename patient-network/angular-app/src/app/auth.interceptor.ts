
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(req);
        if (req.url.indexOf('/users/login') !== -1) {
            return next.handle(req);
        }

        // get the token from a service
        const token: string = this.authService.getAccessToken();

        // add it if we have one
        if (token) {
            req = req.clone({ headers: req.headers.set('X-Access-Token', token) });
        }

        // default --> json
        // if (!req.headers.has('Content-Type')) {
        //     req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        // }

        // setting the accept header
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req);
    }
}