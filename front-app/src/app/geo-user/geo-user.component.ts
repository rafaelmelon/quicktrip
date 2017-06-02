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

  allRoutes: any;
  allPlaces: any;

  constructor(
    public router: Router,
    public session: SessionService
  ) {}

  ngOnInit() {
    this.user = this.session.user;

    if(this.allRoutes == null){
      this.syncDataBase();
    }
  }

  alertChange(){
    this.alertShow = false
  }

  public syncDataBase() {
    this.session.getMapRoute(this.user._id)
    .subscribe(data => {
      this.allRoutes = data;
    });
    this.session.getMapPlace(this.user._id)
    .subscribe(data => {
      this.allPlaces = data;
    });
  }

  public deleteRoute(id) {
    this.session.deleteMapRoute(id)
    .subscribe(res => {
      this.session.getMapRoute(this.user._id)
      .subscribe(data => {
        this.allRoutes = data;
        this.alertShow = true
        this.alertMessage = "The route has been DELETED"
        setTimeout(function(){
          this.alertShow = false
        }, 3000);
      });
    });
  }

  public deletePlace(id){
    this.session.deleteMapPlace(id)
    .subscribe(res => {
      this.session.getMapPlace(this.user._id)
      .subscribe(data => {
        this.allPlaces = data;
        this.alertShow = true
        this.alertMessage = "The place has been DELETED"
        setTimeout(function(){
          this.alertShow = false
        }, 3000);
      });
    });
  }

  public sendNote(id,note) {
    const noteInfo = {
      id: id,
      note: note
    }
    this.session.postNotes(noteInfo)
    .subscribe(res => {
      this.session.getMapRoute(this.user._id)
      .subscribe(data => {
        this.allRoutes = data;
        this.alertShow = true
        this.alertMessage = "Your note has been saved, check your saved notes on the ROUTES tab"
        setTimeout(function(){
          this.alertShow = false
        }, 3000);
      });
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
