import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public UserName:string ='';
  
  options;

  select1=1;
  select2=2;
  
  select3=3;
  select4=4;
  select5=5;
  select6=6;
  


  constructor(private loginServ: LoginService, private router: Router) { 
     
  }

  ngOnInit() {
    this.loginServ.getUserAssigedProjects().subscribe((data) => {
      this.UserName = this.loginServ.userLoggedInDetails().username;
      this.options = data[0]['projectStatus'];
      if(this.loginServ.userLoggedInDetails().userData.length > 0) {
      this.options = this.loginServ.userLoggedInDetails().userData;
      }
      
      this.options.forEach(element => {
        element.Action =   element.status =="submited"?"View CSS":element.status =="saved"?"Edit CSS":"Submit CSS";
      });

    })
  }

  onGoToPage=function(data){
    if(data.status != 'submited')
    {
     if(this.loginServ.setFeedbackProjectData(data) ==true)
       this.router.navigate(['ratings']);
    }
    else{
      alert( 'You have already submitted feedback form for this quarter.');
    }
  }

}
