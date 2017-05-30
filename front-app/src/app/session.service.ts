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

  contacts: Array<Object> = [
    { id: 100, name: 'Andy' },
    { id: 201, name: 'George' },
    { id: 302, name: 'Max' }
  ];

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
    return this.http.get(`${BASEURL}/place/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getList(): Array<Object> {
    return this.contacts;
  }

  postMapRoute(map) {
    return this.http.post(`${BASEURL}/place`, map, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}





// @Injectable()
// export class PhoneService {
//
//   options = {};
//   constructor(private http: Http) {
//   }
//
//   getPhoneList(){
//     return this.http.get(`${BASEURL}/api/phones/`,this.options).map(res => res.json());
//   }
//
//   getPhoneDetails(id){
//     return this.http.get(`${BASEURL}/api/phones/${id}`,this.options).map(res => res.json());
//   }
//
// }
