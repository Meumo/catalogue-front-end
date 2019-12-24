import {Component,OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;
  mode='list';
  categories;
  currentCategory;
  currentProduct;
  motCle: string='';
  page: number=0;
  size: number=2;
  tabPages:Array<number>=[];

  constructor(private catalService: CatalogueService,private http: HttpClient) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.catalService.getRessource("http://localhost:8087/products/search/findByKeyword?mc="+this.motCle+"&size="+this.size+"&page="+this.page)
      .subscribe(data => {
        console.log(data);
        let taille=data["page"].totalPages;
        this.tabPages=new Array(taille);
        this.products=data;
        console.log(taille);
        console.log(this.tabPages);
        
      },err => {
        console.log(err);
      });
  }

  getAllCategories() {
    this.catalService.getRessource(this.catalService.host+"/categories")
      .subscribe(data => {
        this.categories=data;
      },err => {
        console.log(err);
      });
  }

  onDelete(p) {
    let conf=confirm("Etes vous vraiment sure??")
    if(conf) {
      let url=p._links.self.href;
      this.catalService.deleteRessource(url)
        .subscribe(data => {
          this.getAllProducts();
        },err => {
          console.log(err);
        });
    }

  }

  onEdit(p) {
    this.catalService.getRessource(p._links.self.href)
      .subscribe(data => {
        this.currentProduct=data;
        this.mode='edit';
      },err => {
        console.log(err);

      });
  }

  add() {
    this.getAllProducts();
    this.mode='add';
  }

  onAdd(dataForm) {
    this.catalService.addProductTocategory(this.catalService.host+"/addProductTocategory",dataForm)
      .subscribe(data => {
        this.getAllProducts();
        this.mode='list';
      });
  }

  onUpdate(data) {
    let url=this.currentProduct._links.self.href;
    this.catalService.patchRessource(url,data)
      .subscribe(data => {
        this.mode='list';
        this.getAllProducts();
      },err => {
        console.log(err);
      });
  }

    onSearch(form: any) {
      this.page=0;
      this.motCle=form.motCle;
      this.search();
    }


  search() {
    this.http.get("http://localhost:8087/products/search/findByKeyword?mc="+this.motCle+"&size="+this.size+"&page="+this.page)
      .subscribe(data => {
        this.products=data;
        this.motCle="";
      },err => {
        console.log(err);

      });
  }

  goToPage(i: number) {
    this.page=i;
    console.log(i);
    this.search();
  }

}
