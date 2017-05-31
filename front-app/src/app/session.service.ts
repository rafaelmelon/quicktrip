import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

const BASEURL = "http://localhost:3000";

@Injectable()
export class SessionService {
  options = {widthCredentials:true};
  user :any;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${BASEURL}/signup`, user, this.options)
      .map(res => res.json())
      .map(user => {this.user = user; return user;})
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${BASEURL}/login`, user, this.options)
      .map(res => res.json())
      .map(user => {this.user = user; return user;})
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${BASEURL}/logout`, {}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/loggedin`, this.options)
      .map(res => res.json())
      .map(user => {this.user = user; return user;})
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`${BASEURL}/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getMapRoute(id) {
    return this.http.get(`${BASEURL}/route/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  postMapRoute(map) {
    return this.http.post(`${BASEURL}/route`, map, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getMapPlace(id) {
    return this.http.get(`${BASEURL}/place/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  postMapPlace(place) {
    return this.http.post(`${BASEURL}/place`, place, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  postComment(comment) {
    console.log(comment);
    return this.http.post(`${BASEURL}/comment`, comment, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
