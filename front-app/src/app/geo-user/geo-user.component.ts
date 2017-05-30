import { Component, OnInit } from '@angular/core';
import { SessionService } from './../session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-geo-user',
  templateUrl: './geo-user.component.html',
  styleUrls: ['./geo-user.component.css']
})
export class GeoUserComponent implements OnInit {

  user: any;
  error: string;

  routesArray: any;

  constructor(private router: Router, private session: SessionService) { }

  ngOnInit() {
    this.user = this.session.user;

    this.session.getMapRoute(this.user._id)
      .subscribe(
        (data) => this.routesArray = data,
        (err) => this.error = err
      );

    console.log(this.routesArray);
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
