import { Component, OnInit } from '@angular/core';
import { SessionService } from './../session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  error: string;
  welcome: string;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.user = this.session.user;
    this.welcome = this.user.username;
  }

  logout() {
    this.session.logout()
      .subscribe(
        () => this.successCb(null),
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
  }

}
