import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2: string="http://localhost:8080";
  constructor(private http: HttpClient) {}
  jwt: string;
  username: string;
  roles: Array<any>;
  login(data) {
    return this.http.post(this.host2+"/login",data,{observe: 'response'});
  }

  saveToken(jwt) {
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper=new JwtHelperService();
    let objJWT=jwtHelper.decodeToken(this.jwt);
    this.username=objJWT.sub;
    this.roles=objJWT.roles;
    console.log(this.username);
    console.log(this.roles);
    
  }

  isAdmin() {
    for(let r of this.roles) {
      if(r.authority=='ADMIN') return true;
    }
    return false;
  }

  isUser() {
    for(let r of this.roles) {
      if(r.authority=='USER') return true;
    }
    return false;
  }

  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loadToken(){
    this.jwt=localStorage.getItem('token');
    this.parseJWT();
  }

  logout(){
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams(){
    this.username=undefined;
    this.roles=undefined;
    this.jwt=undefined;
  }
}
