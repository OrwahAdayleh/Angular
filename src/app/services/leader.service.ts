import { Injectable } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000)
    });
  }

  getLeader(id:string): Promise <Leader> {
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS.filter((Lead) => (Lead.id === id))[0]), 2000);
    });
  }
  getFeaturedLeader(): Promise<Leader> {
    return new Promise( resolve=> {
      setTimeout(() => resolve(LEADERS.filter((Lead) => Lead.featured)[0]), 2000);
        });
    
  }
}
