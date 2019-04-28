import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.css']
})
export class EditRatingComponent implements OnInit {

  constructor(private loginServ: LoginService, private router: Router) { }
  @ViewChild('f') editForm: NgForm;

  ratingOptionArray: any[];

  ngOnInit() {
    let editKeyString = "save";
    this.loginServ.getUserAssigedProjects().subscribe((data) => {
      this.ratingOptionArray = data[0]['projectStatus'];
      const val =  'save';
      this.ratingOptionArray = this.ratingOptionArray.filter(o =>
      Object.keys(o).some(k => {
          var incomingVal = "" + o[k] ;
          return  incomingVal == 'save'
        } 
      ));
      this.loginServ.userLoggedInDetails().userData = this.ratingOptionArray; // set "save"d item to be dispayed on EDIT Rating page 
    });
  }

  onEditRatingForm() {
    const val =  (this.editForm.value.editProjId).toString() ;
    let selArray = this.ratingOptionArray.filter(o =>
      Object.keys(o).some(k => {
          var incomingVal = "" + o[k] ;
          return  incomingVal == val
        } 
      ));
    
    this.loginServ.userLoggedInDetails().userData = selArray;  // set single selected array on edit page CTA , and send to rating page(next page) to show single iten
    this.loginServ.getProjectCSSRatings(this.editForm.value.editProjId).subscribe(
      (cssData) => {
        console.log("css firebase data is---",cssData );
        this.loginServ.userLoggedInDetails().cssFormData = cssData;
        this.router.navigate(["/ratings"]);
      });
     //.catch(err => console.log(err));
    
  }

}
