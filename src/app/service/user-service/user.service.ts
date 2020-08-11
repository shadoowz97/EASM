import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
username:String
id:String
role:String
position:String
token:String
age:String
constructor() { }

public login(userId,pwd){

}

public logOut(userId,token){

}

public access(){
  
}

public getUserName(){
  return "shadoowz"
}

}
