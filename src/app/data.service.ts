import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

export interface News {
  title: String,
  text: String,
  sign: String,
  rank: String,
  picCount: number
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  public getIntro(): Observable<any> {
    return this.http.get<any>('/api/intro');
  }

  public getNews(): Observable<any> {
    return this.http.get<any>('/api/news');
  }

  public getArchives(): Observable<any> {
    return this.http.get<any>('/api/archives');
  }

  public getActivities(): Observable<any> {
    return this.http.get<any>('/api/activities');
  }

  public getSelective(): Observable<any> {
    return this.http.get<any>('/api/selective');
  }

  public getIsland(): Observable<any> {
    return this.http.get<any>('/api/island');
  }

  public getGarbage(): Observable<any> {
    return this.http.get<any>('/api/garbage');
  }

  public getCalZegSingle(): Observable<any> {
    return this.http.get<any>('/api/cal-zeg-single');
  }

  public getCalZegMulti(): Observable<any> {
    return this.http.get<any>('/api/cal-zeg-multi');
  }

  public getCalVidek(): Observable<any> {
    return this.http.get<any>('/api/cal-videk');
  }

/*  public updateAct(act: any): Observable<any> {
    return this.http.post<any>('api/updateact', act);
  }*/
}
