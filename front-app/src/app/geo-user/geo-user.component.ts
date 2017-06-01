import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from './../session.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-geo-user',
  templateUrl: './geo-user.component.html',
  styleUrls: ['./geo-user.component.css']
})
export class GeoUserComponent implements OnInit {

  user: any;
  error: string;

  alertShow: boolean = false;
  alertMessage: string;

  inputNote = {
    id: '',
    note: ''
  };
  //noteValue:string;

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

  alertChange(){
    this.alertShow = false
  }

  private deleteRoute(id) {

    this.alertShow = true
    this.alertMessage = "The route has been DELETED"

    this.session.deleteMapRoute(id)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );
  }

  // private deletePlace(id){
  //
  //   this.alertShow = true
  //   this.alertMessage = "The place has been DELETED"
  //
  //   this.session.deleteMapPlace(id)
  //     .subscribe(
  //       (user) => this.successCb(user),
  //       (err) => this.errorCb(err)
  //     );
  // }

  private sendNote(id,note) {

    this.alertShow = true
    this.alertMessage = "Your note has been saved, check your saved notes on the ROUTES tab"
    //this.noteValue = '';

    const noteInfo = {
      id: id,
      note: note
    }

    this.session.postNotes(noteInfo)
      .subscribe(
        (user) => this.successCb(user),
        (err) => this.errorCb(err)
      );

  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    // this.router.navigate(['/geomap'])
  }

}
