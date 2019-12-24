import {Component,OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public authService:AuthenticationService) {

  }
  ngOnInit(): void {
    this.authService.loadToken();
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isUser(){
    return this.authService.isUser();
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
