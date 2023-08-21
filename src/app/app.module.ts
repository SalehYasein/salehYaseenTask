import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { MaterialModule } from './modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Interfaces Declaration
//Note: I declared Interfaces in app module because there is just 2 Interfaces

//user information interface
export interface user{
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_names: string;
  avatar: string;
  }

  //API's Pages interface
  export interface options{
    key: number;
    value: string;
  }


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersListComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
