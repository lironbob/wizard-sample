import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {isArray} from "util";

@Injectable()
export class UserAsyncService implements AsyncValidator {
  constructor(private http: Http) {
  }

  validate(c: AbstractControl): Observable<ValidationErrors | null> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('email', c.value);

    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return new Observable<ValidationErrors>(ob => {
      this.http.get(`/api/users`, requestOptions)
        .map(res => res.json())
        .subscribe(data => {
          if (data.length) {
            ob.next({
              'userExist': true
            });
          } else {
            ob.next(null);
          }
        });
    }).first();
  }
}
