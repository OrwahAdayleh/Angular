import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/leaders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS),2000)
    // });
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id:number): Observable <Leader> {
    // return new Promise(resolve=> {
    //   setTimeout(() => resolve(LEADERS.filter((Lead) => (Lead.id === id))[0]), 2000);
    // });
    return this.http.get<Leader>(baseURL + 'leadership/'+ id).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedLeader(): Observable<Leader> {
    // return new Promise( resolve=> {
    //   setTimeout(() => resolve(LEADERS.filter((Lead) => Lead.featured)[0]), 2000);
    //     });
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(Lead => Lead[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
}
