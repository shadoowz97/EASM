import { Injectable } from '@angular/core';
import { TermBasicInfo } from '../../dataDef/TermBasicInfo';
import { ResSet } from 'src/app/dataDef/ResSet';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor(private http: HttpClient) {}
  async createTerm(term: TermBasicInfo): Promise<boolean> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const res: any = await this.http
      .post('/api/term/createNewTerm', JSON.stringify(term), {
        observe: 'body',
        headers: header,
      })
      .toPromise();
    if (res.stateCode == 200) return true;
    else return false;
  }
  termIdUniqueChick(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      this.http.get('/api');
      return null;
    };
  }

  termNameUniqueCeck(): Observable<any> {
    return this.http.get('/api');
  }
  searchTermsById(id: string): ResSet {
    return null;
  }
  searchTermsByName(name: string): ResSet {
    return null;
  }
}
