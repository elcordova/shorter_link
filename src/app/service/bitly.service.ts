import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BitlyService {
  constructor(private http: HttpClient) { }

  shortUrl(longUrl: string): Observable<{link: string}> {
    return this.http.post<{link: string}>(`/v4/shorten/`,{
      long_url: longUrl
    },{ headers: {
      'Authorization': `Bearer ${environment.token}`,
      'Content-Type': 'application/json'
    }});
  }
}
