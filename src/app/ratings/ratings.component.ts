import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  selectedRank1 = '4';
  selectedRank2 = '4';
  selectedRank3 = '4';
  selectedRank4 = '4';
  selectedRank5 = '4';
  selectedRank6 = '4';
  selectedRank7 = '4';
  selectedRank8 = '4';
  selectedRank9 = '4';
  selectedRank10 = '4';

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
    {rank: "3", meaning: 'Somewhat Agree'},
    {rank: "4", meaning: 'Agree'},
    {rank: "5", meaning: 'Strongly Agree'}
  ];

  ngOnInit() {
    this.loginServ.getUserAssigedProjects().subscribe((data) => {
      this.options = data[0]['projectStatus'];
      if(this.loginServ.userLoggedInDetails().userData.length > 0) {
        this.options = this.loginServ.userLoggedInDetails().userData;
      }

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
    const smtConfirm = confirm("Are you sure, you want to submit CSS?");
    let postedData = {
      formData: this.signupForm.value,
      formType: data
    }
    if(smtConfirm == true) {
      this.loginServ.postRating(postedData)
        .subscribe(
          (response) => {
            alert('Ratings ' + data + " successfully");
            console.log("response is--- ",response);
            this.router.navigate(['home']);        
          }
        );

       // .catch(err => console.log(err));
   }
  }

}
