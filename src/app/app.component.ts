import { Component, DoCheck, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private loginServ: LoginService, private router: Router) {}

  userLoggedInDetails : {isLoggedIn: boolean, username: string} = {isLoggedIn: false, username: 'Guest'};
  ngDoCheck() {
    this.userLoggedInDetails = this.loginServ.userLoggedInDetails();
  }
  
  ngOnInit() {
    if(!this.userLoggedInDetails.isLoggedIn) {
      this.router.navigate(["/"]);
    }
  }

  onClickRating() {
    let savedForm  = (this.userLoggedInDetails['userData']).map(x => x.status).indexOf('save');
     // show edit option for saved forms
    if(savedForm > -1) {
      this.router.navigate(["/editrating"]);
    } else {   // show fresh form option for new forms only, No saved , no 'submitted' project's checknox will be visible.. 
      this.userLoggedInDetails['userData'] = this.userLoggedInDetails['userData'].filter(o =>
        Object.keys(o).some(k => {
            var incomingVal = "" + o[k] ;
            return  incomingVal ==  "new";
          } 
        ));
     this.router.navigate(["/ratings"]);
    }
  }

  onLogout() {
    this.loginServ.logOutUser();
  }

}
