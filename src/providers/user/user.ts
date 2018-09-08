import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private user:string;
  private userID:string;

  constructor() {
    console.log('Hello UserProvider Provider');
  }

  setUser(user:string,id:string){
      this.user=user;
      this.userID=id;
  }

  setNameTemp(name:string){
    this.user=name;
  }
  getUserName(){
    return this.user;
  }

  getUserId(){
    return this.userID;
  }
}
