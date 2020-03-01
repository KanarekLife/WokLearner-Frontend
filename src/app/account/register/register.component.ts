import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  private static hasLowerCase(str: string): boolean {
    return str.toUpperCase() !== str;
  }

  private static hasUpperCase(str: string): boolean {
    return str.toLowerCase() !== str;
  }

  private static hasNonAlphaNumericCharacter(str: string): boolean {
    let contain = false;
    '*|,:<>[]{};()@&$#%!'.split('').forEach(x => {
      if (str.includes(x)) {
        contain = true;
      }
    });
    return contain;
  }

  private static hasNumber(str: string): boolean {
    return /\d/.test(str);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const password: string = this.registerForm.controls.password.value;
    if (!RegisterComponent.hasLowerCase(password)) {
      alert('Password do not contain small characters!');
    } else if (!RegisterComponent.hasUpperCase(password)) {
      alert('Password do not contain big characters!');
    } else if (!RegisterComponent.hasNonAlphaNumericCharacter(password)) {
      alert('Password do not contain nonalphanumericcharacter characters! (ex. !, ?, # etc.)');
    } else if (!RegisterComponent.hasNumber(password)) {
      alert('Password do not contain number!');
    } else if (password.length < 6) {
      alert('Password must be minimum 6 characters long!');
    } else {
      this.authenticationService.register(this.registerForm.controls.username.value, this.registerForm.controls.password.value);
    }
  }
}
