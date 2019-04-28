import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Rating } from "./rating.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  myData: Rating[];
  authUserDetails : {isLoggedIn: boolean, username: string, password?: string, userid: number, userData?: any[], cssFormData?: any[] } = {isLoggedIn: false, username: 'Guest', userid:null};

  public getUserAssigedProjects(): Observable<any> {
    let userLoginData = {username: this.authUserDetails.userid, password: this.authUserDetails.password};
     return this.http.post('https://customer-demo.herokuapp.com/login', userLoginData); // TODO: uncomment for Production
    //return this.http.get<Rating[]>("./assets/mockDataProjectAL.json");  // TODO: Comment for Production ,mock API  data: '112233', 'pasword' for local 
  }

  public getLoginJSON(loginFormData): Observable<any> {
     return this.http.post('https://customer-demo.herokuapp.com/login', loginFormData)
   // return this.http.get('./assets/mockDataProjectAL.json');  //mock API  data: 112233, pasword for local

      //   .pipe(
      //     retry(3),
      //     catchError(err => {
      //     console.log('Login Error: ', err);
      //     return of(null);
      //     })
      // ); 
  }

  getSelectedData() {
    return this.myData;
  }
  userLoggedInDetails() {
    return this.authUserDetails;
  }

  logOutUser() {
    this.authUserDetails.isLoggedIn = false;
    this.authUserDetails.username = "Guest";
    this.authUserDetails.userid = null;
    this.router.navigate(["/home"]);
  }

  public getProjectCSSRatings(selectedProjectId): Observable<any> {
    var getCSSUrl = "https://customer-demo.herokuapp.com/get_css?userid=" + this.authUserDetails.userid + "&projectid=" + selectedProjectId; 
    return this.http.get<Rating[]>(getCSSUrl);  // TODO: uncomment for Production
   // return this.http.get<Rating[]>("./assets/mockCSSFormDataL.json");  // TODO: Comment for Production
  }
  
  postRating(formData) {
     return this.http.post('https://customer-demo.herokuapp.com/submit_css', formData);
     // return this.http.post('https://eli-lilly-demo.firebaseio.com/data.json', formData);
  }

}
