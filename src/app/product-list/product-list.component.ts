import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../product-service.service';

import { IProduct } from '../product';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

pageTitle: String = 'Acme Product Management';

showImage:boolean=false;

errorMessage = '';


 _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }


filteredProducts:IProduct[];
products : IProduct[];
onRatingClicked(message:String):void{

	this.pageTitle='Product List:' +message;
}




toggleImage():void {
this.showImage=!this.showImage;


}



  constructor(private productService : ProductServiceService
  ){
  
   
  
  }

  ngOnInit(): void {

  	this.productService.getProducts().subscribe({
      next: product  => {
        this.products = product;
        this.filteredProducts = this.products;
      },  error: err => this.errorMessage = err
    });

}
performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);



    
  }
}
