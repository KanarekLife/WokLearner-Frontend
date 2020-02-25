import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {ApiImage} from '../models/ApiImage';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn()) {
      fetch(environment.apiUrl + '/learning/learn', {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.painting = json;
          });
        } else if (res.status === 400) {
          alert('Well... You have already learned everything O_o');
        } else {
          alert('Couldn\'t connect to service!');
        }
      });
    }
  }
  painting: ApiImage;
  ngOnInit() {
  }
  getUrl(image: ApiImage) {
    return `${environment.apiUrl}/uploads/${image.style}/${image.author}/${image.fileName}`;
  }

  Answer() {
    if (this.authenticationService) {
      fetch(environment.apiUrl + `/learning/answer?paintingId=${this.painting.id}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          location.reload();
        } else {
          alert(res.status);
        }
      });
    }
  }
  Next() {
    alert(`Painting info: style - ${this.painting.style} ; author - ${this.painting.author}`);
    location.reload();
  }
}
