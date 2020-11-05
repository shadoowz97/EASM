import { Injectable } from '@angular/core';
import { base_url } from '../../config/config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResSet } from 'src/app/dataDef/ResSet';
import {UserLogInModel} from "src/app/dataDef/UserLogInModel";
@Injectable({
  providedIn: 'root',
})
export class UserService {
 private userModel:UserLogInModel=new UserLogInModel();
  constructor(private http: HttpClient) {}

  doLogin(): Observable<any> {
    let params=new URLSearchParams();

    let param = new HttpParams().set('username', this.userModel.username).set('password', this.userModel.password);
    return this.http.post<any>(base_url + '/api/doLogin',param,{ 
       observe:"body"
    });
  }
  public logOut(userId, token) {}

  public access() {}

  public accessUserModel():UserLogInModel{
    return this.userModel
  }

  public getUserName() :String{
    return this.userModel.username;
  }
}
