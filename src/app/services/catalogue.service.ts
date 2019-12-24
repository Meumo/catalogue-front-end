import {Injectable,OnInit} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  host: string="http://localhost:8087";
  constructor(private catalservice: CatalogueService,private http: HttpClient,
    private authService: AuthenticationService) {}

  getAllCategorie() {
    return this.http.get(this.host+"/categories");
  }
  
  getRessource(url) {
    return this.http.get(url);
  }
  postRessource(url,data) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.post(url,data,{headers: headers})
  }

  deleteRessource(url) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.delete(url,{headers: headers});
  }

  patchRessource(url,data) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.patch(url,data,{headers: headers})
  }
  addProductTocategory(url,data) {
    let headers=new HttpHeaders({'Authorization': this.authService.jwt});
    return this.http.post(url,data,{headers:headers});
  }
}
