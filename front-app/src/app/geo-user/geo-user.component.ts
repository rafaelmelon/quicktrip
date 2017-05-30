import { Component, OnInit } from '@angular/core';
import { SessionService } from './../session.service';

@Component({
  selector: 'app-geo-user',
  templateUrl: './geo-user.component.html',
  styleUrls: ['./geo-user.component.css']
})
export class GeoUserComponent implements OnInit {

  user: any;
  error: string;
  getMapData: any;


  constructor(private session: SessionService) { }

  ngOnInit() {
    this.getMapData;
    console.log(this.getMapData);
  }




  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
