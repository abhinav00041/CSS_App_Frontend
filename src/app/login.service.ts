import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from "./rating.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  myData: Rating[];
  authUserDetails : {isLoggedIn: boolean, username: string} = {isLoggedIn: false, username: 'Guest'};

  public getJSON(): Observable<any> {
    return this.http.get<Rating[]>("./assets/mockDataA.json");
  }


  getSelectedData() {
    return this.myData;
  }
  userLoggedInDetails() {
    return this.authUserDetails;
  }

  logOutUser() {
    this.authUserDetails.isLoggedIn = false;
    this.authUserDetails.username = "Guest"
    this.router.navigate(["/home"]);
  }

}
