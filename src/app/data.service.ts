import { Injectable } from '@angular/core';

import { MessageSendRequest, MessageSendResponse } from './models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMessage(domain: string, data: MessageSendRequest): Observable<MessageSendResponse> {
    return this.http.post(`/${domain}/messages`, {}, {
      params: { ...data }
    });
  }
}
