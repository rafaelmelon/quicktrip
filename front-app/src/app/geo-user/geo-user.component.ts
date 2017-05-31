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

  allRoutes: any;
  allPlaces: any;

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.user = this.session.user;

    // this.session.getMapRoute(this.user._id)
    //   .subscribe(
    //     (data) => {
    //
    //       this.allRoutes = data
    //       console.log(data);
    //       console.log(this.allRoutes);
    //     },
    //     (err) => this.error = err
    //   );

    // this.session.getMapPlace(this.user._id)
    //   .subscribe(
    //     (data) => this.allPlaces = data,
    //     (err) => this.error = err
    //   );


    this.session.getMapRoute(this.user._id)
    .subscribe(data => {
      this.allRoutes = data;
      console.log(this.allRoutes);
    });

    this.session.getMapPlace(this.user._id)
    .subscribe(data => {
      this.allPlaces = data;
    });




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
