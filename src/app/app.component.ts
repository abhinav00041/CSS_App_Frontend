import { Component, DoCheck } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'app';
  constructor(private loginServ: LoginService) {}
  userLoggedInDetails : {isLoggedIn: boolean, username: string} = {isLoggedIn: false, username: 'Guest'};
  ngDoCheck() {
    this.userLoggedInDetails = this.loginServ.userLoggedInDetails();
  }
  onLogout() {
    this.loginServ.logOutUser();
  }


}
