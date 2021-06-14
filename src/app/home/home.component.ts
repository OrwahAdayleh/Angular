import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/Promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/Leader';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  Leader : Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private LeaderService : LeaderService) { }

  ngOnInit() {
    // this.dishservice.getFeaturedDish().then((dish)=>this.dish=dish);
    this.dishservice.getFeaturedDish().subscribe((dish)=>this.dish=dish);
    this.promotionservice.getFeaturedPromotion().then(promotion=>this.promotion=promotion);
    this.LeaderService.getFeaturedLeader().then(Leader=>this.Leader=Leader);
  }

 

}
