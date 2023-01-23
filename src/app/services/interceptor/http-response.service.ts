import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { CharapterService } from '../charapter.service';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseService implements HttpInterceptor {

  constructor(private charapterService : CharapterService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.charapterService.showError('El usuario no esta autorizado.');
              return throwError(err);
            case 500:
              this.charapterService.showError('Ha ocurrido un fallo en el servidor.');
              return throwError(err);
            case 404:
              this.charapterService.showError('La informacion ingresada no se encuentra o no existe en nuestra lista de personajes.');
              return throwError(err);
            default:
              this.charapterService.showError(err.message);
              return throwError(err);
          }
        } else {
          this.charapterService.showError(err.message);
          return throwError(err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>) {
    let token = false;
    if (token) {
      return req.clone({
        setHeaders: ({
          'Authorization': `Bearer TOKEN`,
        })
      });
    } else {
      return req;
    }
  }
}
