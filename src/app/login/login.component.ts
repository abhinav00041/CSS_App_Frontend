import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from "../login.service";
import { Rating } from '../rating.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginServ: LoginService, private router: Router) { }

  @ViewChild('loginForm') loginForm: NgForm;
  ratingData: Rating[];

  ngOnInit() {}

  onSubmit() {
    this.loginServ.getJSON().subscribe((data) => {
      this.ratingData = data;
      console.log("login data --", data);
      if (data.length > 0) {
        this.loginServ.authUserDetails.username = "Rahul";
        this.loginServ.authUserDetails.isLoggedIn = true ;
        this.router.navigate(['/home']);
      }

    });
  }

}
