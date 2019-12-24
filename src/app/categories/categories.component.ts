import {Component,OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  currentCategory;

  constructor(private catalService: CatalogueService,private router: Router) {}

  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories() {
    this.catalService.getAllCategorie()
      .subscribe(data => {
        this.categories=data
      },err => {
        console.log(err);

      });
  }

  onGetProducts(cat) {
    this.currentCategory=cat;
    let url=cat._links.products.href;
    this.router.navigateByUrl('/products/'+btoa(url));
  }
}
