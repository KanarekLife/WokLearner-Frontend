import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper: JwtHelperService;

  constructor(private router: Router) {
    this.helper = new JwtHelperService();
  }

  setSession(token: string) {
    localStorage.setItem('token', token);
  }

  async login(username: string, password: string) {
    await fetch(environment.apiUrl + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          this.setSession(json.token);
          this.router.navigate(['/']);
        });
      } else if (res.status === 401) {
        alert('Błędna kombinacja nazwy użytkownika i hasła!');
      } else {
        alert(`Wystąpił bład z serwera o numerze ${res.status}! Skontaktuj się z adminem w celu naprawy lub spróbuj ponownie za jakiś czas!`);
      }
    });
  }

  async register(username: string, password: string) {
    await fetch(environment.apiUrl + '/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      if (res.ok) {
        alert('Pomyślnie utworzono konto!');
        this.router.navigate(['/login']);
      } else {
        if (res.status === 400) {
          alert('Sprawdź czy hasło jest wystarczająco złożone!');
        } else {
          alert(`Wystąpił bład z serwera o numerze ${res.status}! Skontaktuj się z adminem w celu naprawy lub spróbuj ponownie za jakiś czas!`);
        }
      }
    });
  }

  logout() {
    localStorage.clear();
  }

  isAdmin() {
    const data = this.helper.decodeToken(this.getToken());
    if (data === null) {
      return false;
    }
    return data.role === 'Administrator';
  }

  isLoggedIn() {
    const status = this.helper.isTokenExpired(this.getToken());
    if (status === true) {
      this.logout();
    }
    return !status;
  }

  getUsername() {
    const data = this.helper.decodeToken(this.getToken());
    if (data === null) {
      return false;
    }
    return data.given_name;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
