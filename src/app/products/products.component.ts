import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Router,NavigationEnd} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;

  constructor(private route: ActivatedRoute,private catalService: CatalogueService,private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let url=atob(this.route.snapshot.params.url);
        this.catalService.getRessource(url)
          .subscribe(data => {
            this.products=data;
          },err => {
            console.log(err);
          });
      }
    })
    let url=atob(this.route.snapshot.params.url);
    this.catalService.getRessource(url)
      .subscribe(data => {
        this.products=data;
      },err => {
        console.log(err);
      });
  }
}
