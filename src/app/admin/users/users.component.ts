import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {environment} from '../../../environments/environment';
import {AppUser} from '../../models/AppUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: AppUser[];

  constructor(private authenticationService: AuthenticationService) {
    this.update();
  }

  ngOnInit() {
  }

  update() {
    if (this.authenticationService.isAdmin()) {
      fetch(environment.apiUrl + '/account/admin/list-users', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.users = json;
          });
        } else {
          alert(res.status);
        }
      });
    }
  }

  RemoveUser(user: AppUser) {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation === true && this.authenticationService.isAdmin()) {
      fetch(environment.apiUrl + `/account/admin/remove?id=${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          alert('Successfully removed user!');
          this.update();
        } else {
          alert(res.status);
        }
      });
    }
  }
}
