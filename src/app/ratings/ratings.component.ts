import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from "../login.service";
import { Rating } from '../rating.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor(private loginServ: LoginService, private router: Router) { }
  @ViewChild('f') signupForm: NgForm;

  options;
  cssFormData;

  selectedRank1 = '5';
  selectedRank2 = '5';
  selectedRank3 = '5';
  selectedRank4 = '5';
  selectedRank5 = '5';
  selectedRank6 = '5';
  selectedRank7 = '5';
  selectedRank8 = '5';
  selectedRank9 = '5';
  selectedRank10 = '5';

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
        this.options  =this.options.filter((el)=>{ return el.status!='submited' }) 
      }
        debugger
      if(this.loginServ.userLoggedInDetails().cssFormData != undefined) {

        this.cssFormData = this.loginServ.userLoggedInDetails().cssFormData[0];

        this.ratingDescVal1 = this.cssFormData.feedBack.comment1;
        this.ratingDescVal2 = this.cssFormData.feedBack.comment2;
        this.ratingDescVal3 = this.cssFormData.feedBack.comment3;
        this.ratingDescVal4 = this.cssFormData.feedBack.comment4;
        this.ratingDescVal5 = this.cssFormData.feedBack.comment5;
        this.ratingDescVal6 = this.cssFormData.feedBack.comment6;
        this.ratingDescVal7 = this.cssFormData.feedBack.comment7;
        this.ratingDescVal8 = this.cssFormData.feedBack.comment8;
        this.ratingDescVal9 = this.cssFormData.feedBack.comment9;
        this.ratingDescVal10 = this.cssFormData.feedBack.comment10;

        this.selectedRank1 = this.cssFormData.feedBack.rating1 + "";
        this.selectedRank2 = this.cssFormData.feedBack.rating2 + "";
        this.selectedRank3 = this.cssFormData.feedBack.rating3 + "";
        this.selectedRank4 = this.cssFormData.feedBack.rating4 + "";
        this.selectedRank5 = this.cssFormData.feedBack.rating5 + "";
        this.selectedRank6 = this.cssFormData.feedBack.rating6 + "";
        this.selectedRank7 = this.cssFormData.feedBack.rating7 + "";
        this.selectedRank8 = this.cssFormData.feedBack.rating8 + ""
        this.selectedRank9 = this.cssFormData.feedBack.rating9 + "";
        this.selectedRank10 = this.cssFormData.feedBack.rating10 + "";
      }      
    });
  }



  onSubmit(data) {

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
      object["formType"] = data
      if(key.includes("ProductID_"))
      {
        object['projectid'] = this.signupForm.value[key],
        object["userid"]=this.options[0].userId,
        object["feedback"]= this.signupForm.value
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
        object["CalculatedValue"] =calculatedpersum/10;
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
            this.router.navigate(['home']);        
          },(err)=>{  console.log("errer is--- ",err);}
        );

       // .catch(err => console.log(err));
   }
  }

}
