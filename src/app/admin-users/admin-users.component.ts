import {Component,OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users;
  mode: string='list';
  errorMessage: string='';
  currentUser;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getResource(this.userService.host+"/appUsers")
      .subscribe(data => {
        this.users=data;
      },err => {
        console.log(err);
      });
  }

  onAdd() {
    this.mode='add';
  }

  onSave(dataForm) {
    this.userService.postResource(this.userService.host+"/register",dataForm)
      .subscribe(data => {
        this.getAllUsers();
        this.mode='list';
      },err => {
        this.errorMessage=err.error.message;
        this.mode='add';
      });
  }
  onDelete(user) {
    let conf=confirm('Etes vous vraiment sûre?');
    if(conf) {
      let url=user._links.self.href;
      this.userService.deleteresource(url)
        .subscribe(data => {
          this.getAllUsers();
        },err => {
          console.log(err);
        });
    }
  }

  onEdit(user) {
    this.userService.getResource(user._links.self.href)
      .subscribe(data => {
        this.currentUser=data;
        this.mode='edit';
      },err => {
        console.log(err);
      });
  }

  onUpdate(user) {
    let url=this.currentUser._links.self.href;
    this.userService.patchRessource(url,user)
      .subscribe(data => {
        this.getAllUsers();
        this.mode='list';
      },err => {
        console.log(err);

      });
  }
}
