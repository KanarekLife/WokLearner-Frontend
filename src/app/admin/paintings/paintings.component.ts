import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {environment} from 'src/environments/environment';
import {ApiImage} from '../../models/ApiImage';
import {PaginationStatus} from '../../models/PaginationStatus';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {
  images: ApiImage[];
  newImage: ApiImage;
  page = 0;
  pages = 0;
  loading = false;

  constructor(private authenticationService: AuthenticationService) {
    this.newImage = new ApiImage();
    this.update();
  }

  ngOnInit() {
  }


  Save(image: ApiImage, files: FileList) {
    const type = files.length !== 0;
    const formData = new FormData();
    formData.append('author', image.author);
    formData.append('style', image.style);
    if (type) {
      const file = files.item(0);
      formData.append(file.name, file);
      formData.append('filename', file.name);
    } else {
      formData.append('filename', image.fileName);
    }
    if (!formData) {
      return;
    }
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.authenticationService.getToken(),
      },
      method: 'PUT',
      body: formData
    };
    delete options.headers['Content-Type'];
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isAdmin()) {
      fetch(environment.apiUrl + `/paintings/update/${image.id}?replaceImage=${type}`, options).then(res => {
        if (res.ok) {
          location.reload();
        } else {
          alert(res.status);
        }
      });
    }
  }

  Delete(image: ApiImage) {
    if (confirm('Are you sure? Following action will be automatically uploaded to server!') && this.authenticationService.isLoggedIn()
      && this.authenticationService.isAdmin()) {
      fetch(environment.apiUrl + `/paintings/remove/${image.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.authenticationService.getToken(),
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

  Create(files: FileList) {
    if (files.length < 0) {
      return;
    }
    const file = files.item(0);
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append('author', this.newImage.author);
    formData.append('filename', file.name);
    formData.append('style', this.newImage.style);
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.authenticationService.getToken(),
      },
      method: 'POST',
      body: formData
    };
    delete options.headers['Content-Type'];
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isAdmin()) {
      fetch(environment.apiUrl + '/paintings/create', options).then(res => {
        if (res.ok) {
          location.reload();
        } else {
          alert(res.status);
        }
      });
    }
  }

  update() {
    if (this.authenticationService.isLoggedIn()) {
      this.loading = true;
      this.images = [];
      fetch(environment.apiUrl + `/paintings/get?page=${this.page}`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.images = json.images as ApiImage[];
            this.page = json.page;
            this.pages = json.pagesCount;
          });
        } else {
          alert(res.status);
        }
        this.loading = false;
      });
    }
  }

  getUrl(image: ApiImage) {
    return `${environment.apiUrl}/uploads/${image.style}/${image.author}/${image.fileName}`;
  }

  onUpdate($event: PaginationStatus) {
    this.page = $event.page;
    this.pages = $event.pages;
    this.update();
  }
}
