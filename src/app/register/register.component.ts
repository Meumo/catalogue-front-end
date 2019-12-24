import {Component,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mode: string='add';
  host: string='http://localhost:8080';
  errorMessage: string='';
  user;
  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit() {
  }


  onSave(data) {
    this.http.post(this.host+'/register',data)
      .subscribe(data => {
        console.log(data);
        
        this.user=data;
        this.errorMessage='';
        this.mode='list';
      },err => {
        this.errorMessage=err.error.message;
        this.mode='add';
      });
  }

  onNewRegister(){
    this.mode='add';
    this.user=undefined;
  }

  onLogin(){
    this.router.navigateByUrl('/login');
  }
}
