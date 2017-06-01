import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from './../session.service';

@Component({
  selector: 'app-geo-info',
  templateUrl: './geo-info.component.html',
  styleUrls: ['./geo-info.component.css']
})
export class GeoInfoComponent implements OnInit {

  alertShow: boolean = false;
  alertMessage: string;

  @Input() userPlaces:any ;
  @Input() userPlacesRoute:any ;

  @Input() origin:any ;
  @Input() destination:any;

  @Output() alertNotification = new EventEmitter<any>();

  user: any;
  error: string;

  public newPlace = {
    user: '',
    name: '',
    location: '',
    icon: ''
  };

  alert: string;

  constructor(private session: SessionService) { }

  ngOnInit() {

    this.user = this.session.user;

  }

  public savePlace(place){

    this.newPlace.user = this.user._id;
    this.newPlace.name = place.name;
    this.newPlace.location = place.vicinity;
    this.newPlace.icon = place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150})

    this.session.postMapPlace(this.newPlace)
    .subscribe(
      (user) => this.successCb(user),
      (err) => this.errorCb(err)
    );

    this.alertNotification.emit({
      alertShow : true,
      alertMessage : "The place has been SAVED, check on your profile"
    })
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
