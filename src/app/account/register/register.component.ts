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
      alert('Hasło musi zawierać małą literę!');
    } else if (!RegisterComponent.hasUpperCase(password)) {
      alert('Hasło musi zawierać dużą literę!');
    } else if (!RegisterComponent.hasNonAlphaNumericCharacter(password)) {
      alert('Hasło musi zawierać znak specjalny! (np. !, ?, # itp.)');
    } else if (!RegisterComponent.hasNumber(password)) {
      alert('Hasło musi zawierać cyfrę!');
    } else if (password.length < 6) {
      alert('Hasło musi mieć minimum 6 znaków długości!');
    } else {
      this.authenticationService.register(this.registerForm.controls.username.value, this.registerForm.controls.password.value);
    }
  }
}
