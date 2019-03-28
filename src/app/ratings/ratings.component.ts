import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from "../login.service";
import { Rating } from '../rating.model';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor(private loginServ: LoginService) { }
  @ViewChild('f') signupForm: NgForm;

  ratingData: Rating[];

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

  ratingDescVal1;
  ratingDescVal2;
  ratingDescVal3;
  ratingDescVal4;
  ratingDescVal5;
  ratingDescVal6;
  ratingDescVal7;
  ratingDescVal8;
  ratingDescVal9;
  ratingDescVal10;

  genders = ['male', 'female'];

  rankingArryObject = [
    {rank: "1", meaning: 'Strongly Disagree'},
    {rank: "2", meaning: 'Disagree'},
    {rank: "3", meaning: 'Somewhat Agree'},
    {rank: "4", meaning: 'Agree'},
    {rank: "5", meaning: 'Strongly Agree'}
  ];

  ngOnInit() {
     this.loginServ.getJSON().subscribe((data) => {
      this.ratingData = data;
      console.log("datadta xxx----", data)
    });
  }

  onSubmit(data) {
     console.log("datais signupForm --", data,  " signin form --", this.signupForm );
  }

}
