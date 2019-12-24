import {Component,OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories;
  mode="list";
  currentCategory;
  constructor(private catalService: CatalogueService) {}

  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories() {
    this.catalService.getAllCategorie()
      .subscribe(data => {
        this.categories=data;
      }),err => {
        console.log(err);

      };
  }

  onAdd(data) {
    let url=this.catalService.host+"/categories";
    this.catalService.postRessource(url,data)
      .subscribe(data => {
        this.getAllCategories();
        this.mode='list';
      },err => {
        console.log(err);
      });
  }

  onDelete(cat) {
    let conf=confirm("Etes vous sure?");
    if(conf) {
      let url=cat._links.self.href;
      this.catalService.deleteRessource(url)
        .subscribe(data => {
          this.getAllCategories();
        },err => {
          console.log(err);
        });
    }
  }

  onEdit(cat) {
    this.catalService.getRessource(cat._links.self.href)
    .subscribe(data=>{
      this.currentCategory=data;
      this.mode='edit';
    },err=>{
      console.log(err);
      
    });
  }
  add() {
    this.mode="add";
  }
  onUpdate(data) {
    let url=this.currentCategory._links.self.href;
    this.catalService.patchRessource(url,data)
      .subscribe(data => {
        this.mode='list';
        this.getAllCategories();
      },err => {
        console.log(err);
      });
  }
}
