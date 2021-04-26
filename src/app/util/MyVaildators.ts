/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-22 22:06:32
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-22 18:57:39
 */
import { AnimateTimings } from '@angular/animations';
import { resolveForwardRef } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
export class MyValidators {
  static UpperCase(): ValidatorFn {
    return (contorl: AbstractControl): { [key: string]: any } | null => {
      const charArray = <string>contorl.value;
      let re = new RegExp('[^A-Z]');
      const flag = re.test(charArray);
      return flag ? { UpperCase: { value: contorl.value } } : null;
    };
  }

  static EN(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const str = <string>control.value;
      let re = /[^A-Za-z\s]/;
      const flag = re.test(str);
      return flag ? { EN: { value: control.value } } : null;
    };
  }

  static CN(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const str = <string>control.value;
      let re = /[^\u4e00-\u9fa5]/;
      return re.test(str) ? { CN: { value: control.value } } : null;
    };
  }

  static Email(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const str = control.value as string;
      let re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return re.test(str) ? null : { Email: { value: control.value } };
    };
  }

  static PRCID(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const str = control.value as string;
      let re = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      return re.test(str) ? null : { PRCID: { value: control.value } };
    };
  }
}
