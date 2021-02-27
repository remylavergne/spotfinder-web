import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {
  }

  public checkTokenValidity(token: string): Observable<boolean> {
    return this.http.post<boolean>(baseUrl + `/user/reset-password-token-verification`, {token});
  }

  public resetPassword(newPassword: string, token: string): Observable<boolean> {
    return this.http.post<any>(baseUrl + `/user/reset-password`, {
      password: newPassword,
      urlToken: token
    });
  }
}
