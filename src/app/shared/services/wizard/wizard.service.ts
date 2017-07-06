import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WizardService {
  constructor(private http: Http) {
  }

  setStep(step: string, values: any, action: string | null = null) {
    switch (action) {
      case 'add':
        return this.post('users', values).subscribe(data => sessionStorage.setItem('id', JSON.stringify(data.id)));
      case 'update':
        return this.patch(`users/${JSON.parse(sessionStorage.getItem('id'))}`, values)
          .subscribe(data => sessionStorage.setItem(step, JSON.stringify(values)));
      default:
        sessionStorage.setItem(step, JSON.stringify(values));
    }
  }

  getSteps(step: string): any {
    switch (step) {
      case 'create-user':
        return JSON.parse(sessionStorage.getItem('id'));
      default:
        return JSON.parse(sessionStorage.getItem(step));
    }
  }

  post(method: string, payload: any): Observable<any> {
    return this.http.post(`/api/${method}`, payload).map(res => res.json());
  }

  patch(method: string, payload: any): Observable<any> {
    return this.http.patch(`/api/${method}`, payload).map(res => res.json());
  }

  get(method: string, payload: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const param in payload) {
      params.set(param, payload[param]);
    }
    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get(`/api/${method}`, requestOptions).map(res => res.json());
  }

}