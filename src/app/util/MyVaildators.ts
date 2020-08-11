import { AbstractControl, ValidatorFn } from '@angular/forms';
export class MyValidators {
  static UpperCase(): ValidatorFn {
    return (contorl: AbstractControl) :{ [key: string]: any } | null=>{
      const charArray = <string>contorl.value;
      let re = new RegExp('[^A-Z]');
      const flag = re.test(charArray);
      return flag ? { UpperCase: { value: contorl.value } } : null;
    };
  }

  static EN(): ValidatorFn {
    return (control: AbstractControl):{[key:string]:any}|null => {
      const str = <string>control.value;
      let re = /[^A-Za-z\s]/;
      const flag = re.test(str);
      return flag ? { EN: { value: control.value } } : null;
    };
  }

  static CN(): ValidatorFn {
    return (control: AbstractControl):{[key:string]:any}|null => {
      const str = <string>control.value;
      let re = /[^\u4e00-\u9fa5]/;
      return re.test(str) ? { CN: { value: control.value } } : null;
    };
  }
}
