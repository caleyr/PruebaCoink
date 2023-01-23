import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const URL_API = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class CharapterService {

  private messageError = new Subject<string>();
  messageErrorHttp = this.messageError.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  showError(text : string){    
    this.messageError.next(text);
  }

  getListCharapter( paramsHttp : HttpParams ){
    return this.http.get<any>(`${URL_API}/character`, {params : paramsHttp});
  }
}
