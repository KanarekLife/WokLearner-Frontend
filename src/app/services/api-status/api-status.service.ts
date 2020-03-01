import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {

  constructor() {
  }

  async getStatus() {
    return (await fetch(environment.apiUrl + '/swagger/index.html')).ok;
  }
}
