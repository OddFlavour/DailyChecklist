import {Injectable} from '@angular/core';
import * as Constants from '../constants/Constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '../models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getEvents(startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders().append('user-id', '100');
    const query = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(Constants.API_BASE_URL + '/events', {params: query, headers: headers});
  }

  postEvents(body: EventModel): Observable<any> {
    const headers = new HttpHeaders().append('user-id', '100');

    return this.http.post(Constants.API_BASE_URL + '/events', body, {headers: headers});
  }

  postEventsById(body: EventModel): Observable<any> {
    const headers = new HttpHeaders().append('user-id', '100');
    const url = `${Constants.API_BASE_URL}/events/${body._id}`;

    return this.http.post(url, body, {headers: headers});
  }
}
