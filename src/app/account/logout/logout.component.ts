import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
