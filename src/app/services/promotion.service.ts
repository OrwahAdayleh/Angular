import { Injectable } from '@angular/core';
import {Promotion} from '../shared/Promotion';
import {PROMOTIONS} from '../shared/Promotions';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(PROMOTIONS),2000)
    // });
    return this.http.get<Promotion[]>(baseURL + 'PROMOTIONS')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

 getPromotion(id: number): Observable<Promotion> {
// return new Promise(resolve=> {
// setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
// });
return this.http.get<Promotion>(baseURL + 'PROMOTIONS/'+ id).pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return new Promise( resolve=> {
    //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
    //     });
    return this.http.get<Promotion[]>(baseURL + 'PROMOTIONS?featured=true').pipe(map(Promo => Promo[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
