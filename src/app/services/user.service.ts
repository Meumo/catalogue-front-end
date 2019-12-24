import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host: string="http://localhost:8080";

  constructor(private http: HttpClient,private authService: AuthenticationService) {}

  getResource(url) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.get(url,{headers: headers});
  }

  postResource(url,data){
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.post(url,data,{headers: headers});
  }

  deleteresource(url){
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.delete(url,{headers: headers});
  }

  patchRessource(url,data) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.patch(url,data,{headers: headers});
  }
}
