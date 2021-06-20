import { Component, OnInit } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  Leaders : Leader[];


  constructor( private LeaderService:LeaderService) { }

  ngOnInit() {
    this.LeaderService.getLeaders().subscribe(Leader=>this.Leaders=Leader);
  }

}
