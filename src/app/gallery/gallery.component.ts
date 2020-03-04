import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {ApiImage} from '../models/ApiImage';
import {PaginationStatus} from '../models/PaginationStatus';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: ApiImage[];
  styles: string[];
  selectedStyle = 'null';
  authors: string[];
  selectedAuthor = 'null';
  page = 0;
  pages = 0;

  constructor(private authenticationService: AuthenticationService) {
    this.update();
  }

  ngOnInit() {
  }

  update() {
    if (this.authenticationService.isLoggedIn()) {
      this.images = [];
      this.getStyles();
      this.getAuthors();
      let requestUrl = `/paintings/get?page=${this.page}&random=false`;
      if (this.selectedStyle !== 'null') {
        requestUrl += `&style=${this.selectedStyle}`;
      }
      if (this.selectedAuthor !== 'null') {
        requestUrl += `&author=${this.selectedAuthor}`;
      }
      fetch(environment.apiUrl + requestUrl, {
        cache: 'force-cache',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.images = json.images;
            this.page = json.page;
            this.pages = json.pagesCount;
          });
        } else {
          alert(res.status);
        }
      });
    }
  }
  onUpdate(status: PaginationStatus) {
    this.page = status.page;
    this.pages = status.pages;
    this.update();
  }

  getUrl(image: ApiImage) {
    return `${environment.apiUrl}/uploads/${image.style}/${image.author}/${image.fileName}`;
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
