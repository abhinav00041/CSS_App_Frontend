import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from "../login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginServ: LoginService, private router: Router) { }

  @ViewChild('loginForm') loginForm: NgForm;
  ratingData

  ngOnInit() {}

  onSubmit() {
    this.loginServ.getLoginJSON(this.loginForm.value).subscribe((data) => {
      this.ratingData = data;
      if (data.length > 0) {
        debugger
        this.loginServ.authUserDetails.username = data[0].name;
        this.loginServ.authUserDetails.password = data[0].password;
        this.loginServ.authUserDetails.isLoggedIn = true ;
        this.loginServ.authUserDetails.userid = data[0].userId ;
        this.loginServ.authUserDetails.userData = data[0]['projectStatus'];
        this.router.navigate(['/ratings']);
      }
    });
  }

}
