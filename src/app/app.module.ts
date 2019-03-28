import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RatingsComponent } from './ratings/ratings.component';
import { StackholdersComponent } from './stackholders/stackholders.component';
import { LoginComponent } from './login/login.component';


const appRoute: Routes = [
  {path: "", component: LoginComponent},
  {path: "ratings", component: RatingsComponent},
  {path: "stackholders", component: StackholdersComponent},
  {path: "home", component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RatingsComponent,
    StackholdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
