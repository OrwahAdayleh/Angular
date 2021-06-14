import { Injectable } from '@angular/core';
import {Promotion} from '../shared/Promotion';
import {PROMOTIONS} from '../shared/Promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS),2000)
    });
    
  }

 getPromotion(id: string): Promise<Promotion> {
  return new Promise(resolve=> {
    setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
  });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise( resolve=> {
      setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
        });
  }
}
