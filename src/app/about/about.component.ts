import { Component, OnInit } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  Leaders : Leader[];


  constructor( private LeaderService:LeaderService) { }

  ngOnInit() {
    this.LeaderService.getLeaders().then(Leader=>this.Leaders=Leader);
  }

}
