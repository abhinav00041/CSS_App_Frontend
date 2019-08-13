import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from "../login.service";
import { Rating } from '../rating.model';
import { Router } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor(private loginServ: LoginService, private router: Router) { }
  @ViewChild('f') signupForm: NgForm;

  options;
  object1={};
  cssFormData;
  public show:boolean = true;
  public show1:boolean = false;
  public UserId:string = '';
  public UserName:string ='';
  public ProductList = [];
  public productid;
  currentRate = 5;
  selectedRank1 = "5";
  selectedRank2 = '5';
  selectedRank3 = '5';
  selectedRank4 = '5';
  selectedRank5 = '5';
  selectedRank6 = '5';
  selectedRank7 = '5';
  selectedRank8 = '5';
  selectedRank9 = '5';
  selectedRank10 = '5';
  ratingValue1 = "5";
  ratingValue2 = '5';
  ratingValue3 = '5';
  ratingValue4 = '5';
  ratingValue5 = '5';
  ratingValue6 = '5';
  ratingValue7 = '5';
  ratingValue8 = '5';
  ratingValue9 = '5';
  ratingValue10 = '5';

  ratingDescVal1 = '';
  ratingDescVal2 = '';
  ratingDescVal3 = '';
  ratingDescVal4 = '';
  ratingDescVal5 = '';
  ratingDescVal6 = '';
  ratingDescVal7 = '';
  ratingDescVal8 = '';
  ratingDescVal9 = '';
  ratingDescVal10 = '';

  rankingArryObject = [
    {rank: "1", meaning: 'Strongly Disagree'},
    {rank: "2", meaning: 'Disagree'},
    {rank: "3", meaning: 'Somewhat Disagree'},
    {rank: "4", meaning: 'Somewhat Agree'},
    {rank: "5", meaning: 'Agree'},
    {rank: "6", meaning: 'Strongly Agree'}
  ];

  ngOnInit() {

    this.loginServ.getUserAssigedProjects().subscribe((data) => {
      
      this.options = data[0]['projectStatus'];
      if(this.loginServ.userLoggedInDetails().userData.length > 0) {
        this.options = this.loginServ.userLoggedInDetails().userData;
        this.UserName = this.loginServ.userLoggedInDetails().username;
        this.UserId = this.loginServ.userLoggedInDetails().userid.toString();
        this.ProductList = this.loginServ.userLoggedInDetails().userData;
      
      }else{
        this.show=false;
        this.show1=true;
      }
      if(this.loginServ.getFeedbackProjectData()!= undefined)
      {
        this.options =[this.loginServ.getFeedbackProjectData()];
        this.productid=this.options[0]["projectId"];
        this.loginServ.getProjectCSSRatings(this.productid).subscribe((data) => {
          this.loginServ.userLoggedInDetails().cssFormData=[data[data.length -1]]

          if(this.loginServ.userLoggedInDetails().cssFormData != undefined) {
          
            this.cssFormData = this.loginServ.userLoggedInDetails().cssFormData[0];
            this.ratingDescVal1 = this.cssFormData.feedBack.ratingDesc1;
            this.ratingDescVal2 = this.cssFormData.feedBack.ratingDesc2;
            this.ratingDescVal3 = this.cssFormData.feedBack.ratingDesc3;
            this.ratingDescVal4 = this.cssFormData.feedBack.ratingDesc4;
            this.ratingDescVal5 = this.cssFormData.feedBack.ratingDesc5;
            this.ratingDescVal6 = this.cssFormData.feedBack.ratingDesc6;
            this.ratingDescVal7 = this.cssFormData.feedBack.ratingDesc7;
            this.ratingDescVal8 = this.cssFormData.feedBack.ratingDesc8;
            this.ratingDescVal9 = this.cssFormData.feedBack.ratingDesc9;
            this.ratingDescVal10 = this.cssFormData.feedBack.ratingDesc10;
    
            this.selectedRank1 = this.cssFormData.feedBack.ratingValue1 + "";
            this.selectedRank2 = this.cssFormData.feedBack.ratingValue2 + "";
            this.selectedRank3 = this.cssFormData.feedBack.ratingValue3 + "";
            this.selectedRank4 = this.cssFormData.feedBack.ratingValue4 + "";
            this.selectedRank5 = this.cssFormData.feedBack.ratingValue5 + "";
            this.selectedRank6 = this.cssFormData.feedBack.ratingValue6 + "";
            this.selectedRank7 = this.cssFormData.feedBack.ratingValue7 + "";
            this.selectedRank8 = this.cssFormData.feedBack.ratingValue8 + ""
            this.selectedRank9 = this.cssFormData.feedBack.ratingValue9 + "";
            this.selectedRank10 = this.cssFormData.feedBack.ratingValue10 + "";
          }

      })
      }

 
     
            
    });

   
  }



  onSubmit(data) {
      debugger
    console.log("this.signupForm  IS:    ", this.signupForm);
    const smtConfirm = confirm("Are you sure, you want to submit CSS?");
    let postedData = [];
    let calPerValue = [
      {rank: "1", meaning: 'Strongly Disagree', value:16.67},
      {rank: "2", meaning: 'Disagree' , value:33.33},
      {rank: "3", meaning: 'Somewhat Disagree', value:50},
      {rank: "4", meaning: 'Somewhat Agree', value:66.67},
      {rank: "5", meaning: 'Agree', value:83.33},
      {rank: "6", meaning: 'Strongly Agree', value:100}
  ]
    for(let key in this.signupForm.value)
    {
      let object={};
      object["formType"] = data;
      object["userid"]=this.UserId;
      object["UserName"]=this.UserName;
      if(key.includes("ProductID_"))
      {
        object['projectid'] = this.signupForm.value[key];
        object['projectname']=  this.ProductList.find((el)=>{return el.projectId==  this.signupForm.value[key] }) ?this.ProductList.find((el)=>{return el.projectId==  this.signupForm.value[key] }).projectName :'';
        object["feedback"]= this.signupForm.value;
        let calculatedpersum=0;
        for(let key1 in this.signupForm.value)
        {
          if(key1.includes("ratingValue"))
          {
            let calperobject = calPerValue.find((el) =>{ return el.rank ==  this.signupForm.value[key1]});
            if(calperobject)
            {
              calculatedpersum +=calperobject.value;
            }
          }
        }
        object["CalculatedValue"] =(calculatedpersum/10).toFixed(2);
        postedData.push(object);
      }
    }


    //  postedData = {
    //   formData: this.signupForm.value,
    //   formType: data,
    //   projectid:this.signupForm.value.projectid,
    //   userid:"112233",
    //  feedback: this.signupForm.value }
    console.log(postedData);
    if(smtConfirm == true) {
      this.loginServ.postRating(postedData)
        .subscribe(
          (response) => {
            alert('Ratings ' + data + " successfully");
            console.log("response is--- ",response);
            this.loginServ.getUserAssigedProjects().subscribe((data) => {
              if (data.length > 0) {
                debugger
                this.loginServ.authUserDetails.username = data[0].name;
                this.loginServ.authUserDetails.password = data[0].password;
                this.loginServ.authUserDetails.isLoggedIn = true ;
                this.loginServ.authUserDetails.userid = data[0].userId ;
                this.loginServ.authUserDetails.userData = data[0]['projectStatus'];
                this.router.navigate(['home']);   
              }
            },(err)=>{ alert("errer is--- "+err); console.log("errer is--- ",err);});
          },(err)=>{  console.log("errer is--- ",err);}
        );

       // .catch(err => console.log(err));
   }
  }

}
