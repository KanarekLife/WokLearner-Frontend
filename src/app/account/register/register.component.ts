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
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.authenticationService.register(this.registerForm.controls.username.value, this.registerForm.controls.password.value);
  }
}
