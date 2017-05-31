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

  comment: string;

  allRoutes: any;
  allPlaces: any;

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.user = this.session.user;

    this.session.getMapRoute(this.user._id)
    .subscribe(data => {
      this.allRoutes = data;
    });

    this.session.getMapPlace(this.user._id)
    .subscribe(data => {
      this.allPlaces = data;
    });



  }

  // private sendComment() {
  //
  //   this.comment = this.comment
  //   // this.allRoutes._id
  //   console.log(this.allRoutes._id);
  //   console.log(this.comment);
  //
  //   // this.session.postComment(this.comment)
  //   //   .subscribe(
  //   //     (user) => this.successCb(user),
  //   //     (err) => this.errorCb(err)
  //   //   );
  // }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
