import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.SaveSkipLevel();
    this.SaveLearningStatus();
  }
  skipLevel: number;
  learnedNumber: number;
  ngOnInit() {
  }
  ChangeUsername(newUsername: string) {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + `/account/change-username?newUsername=${newUsername}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          alert(`Successfully changed your username to ${newUsername}!`);
          this.authenticationService.logout();
          this.router.navigate(['/']);
        } else {
          alert(res.status);
        }
      });
    }
  }
  ChangePassword(oldPassword: string, newPassword: string, newRepeatedPassword: string) {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + `/account/change-password`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken(),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          OldPassword: oldPassword,
          NewPassword: newPassword,
          RepeatedNewPassword: newRepeatedPassword
        })
      }).then(res => {
        if (res.ok) {
          alert('Successfully changed your password!');
          this.authenticationService.logout();
          this.router.navigate(['/']);
        } else {
          alert(res.status);
        }
      });
    }
  }

  RemoveAccount(password: string) {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + '/account/remove', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          alert('Successfully deleted your account!');
          this.authenticationService.logout();
          this.router.navigate(['/']);
        } else {
          alert(res.status);
        }
      });
    }
  }
  GetUsername() {
    return this.authenticationService.getUsername();
  }
  SaveSkipLevel() {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + '/learning/skip-level', {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.skipLevel =  json as number;
          });
        } else {
          alert(res.status);
        }
      });
    }
  }

  ChangeSkipLevel(skipLevel: number) {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + `/learning/skip-level?skipLevel=${skipLevel}`, {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        },
        method: 'POST'
      }).then(res => {
        if (res.ok) {
          this.SaveSkipLevel();
        } else {
          alert(res.status);
        }
      });
    }
  }

  SaveLearningStatus() {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + '/learning/get-guesses', {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.learnedNumber = json as number;
          });
        } else {
          alert(res.status);
        }
      });
    }
  }

  ClearProgress() {
    if (this.authenticationService.isLoggedIn() && confirm('Are you sure you want to clear your progress?')) {
      fetch(environment.apiUrl + '/learning/clear-learned', {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        },
        method: 'POST'
      }).then(res => {
        if (res.ok) {
          alert('Your progress has been cleared!');
          location.reload();
        } else {
          alert(res.status);
        }
      });
    }
  }
}
