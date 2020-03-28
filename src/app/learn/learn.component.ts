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

  painting: ApiImage;
  selectedAuthor = 'null';
  selectedStyle = 'null';
  styles: string[] = [];
  authors: string[] = [];

  popUpTitle: string = null;
  popUpContent: string = null;

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn()) {
      this.getStyles();
      this.getAuthors();
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
          alert('Cóż... Nauczyłeś się już wszytkiego albo wystąpił błąd O_o');
        } else {
          alert('Nie można połączyć się z serwerem :-(');
        }
      });
    }
  }

  ngOnInit() {
  }

  getUrl(image: ApiImage) {
    return `${environment.apiUrl}/uploads/${image.style}/${image.author}/${image.fileName}`;
  }

  Answer() {
    if (this.authenticationService && this.selectedAuthor !== null && this.selectedStyle !== null) {
      fetch(environment.apiUrl + `/learning/answer?paintingId=${this.painting.id}&style=${this.selectedStyle}&author=${this.selectedAuthor}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            if (json.result) {
              this.showPopUp('Dobra odpowiedź!', 'Brawo!');
            } else {
              this.showPopUp(`Błędna odpowiedź!`, `Poprawna odpowiedź: ${this.painting.style} - ${this.painting.author}`);
            }
          });
        } else {
          alert(res.status);
        }
      });
    }
  }

  getStyles() {
    if (this.authenticationService.isLoggedIn()) {
      let requestUrl = '/paintings/get/styles';
      if (this.selectedAuthor !== 'null') {
        requestUrl += `?author=${this.selectedAuthor}`;
      }
      fetch(environment.apiUrl + requestUrl, {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.styles = json.sort();
          });
        } else {
          alert(res.status);
        }
      });
    }
  }

  Close() {
    location.reload();
  }

  showPopUp(title: string, content: string) {
    this.popUpTitle = title;
    this.popUpContent = content;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  getAuthors() {
    if (this.authenticationService.isLoggedIn()) {
      let requestUrl = '/paintings/get/authors';
      if (this.selectedStyle !== 'null') {
        requestUrl += `?style=${this.selectedStyle}`;
      }
      fetch(environment.apiUrl + requestUrl, {
        headers: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.authors = json.sort();
          });
        } else {
          alert(res.status);
        }
      });
    }
  }
}
