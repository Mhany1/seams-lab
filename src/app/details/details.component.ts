import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Iproduct } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any
  cart: any[] = []
  amount: number = 1
  products: any[] = []
  finalProduct: Iproduct[] = []
  viewImg: any


  @ViewChild('btn') button!: ElementRef
  @ViewChild('img1') image1!: ElementRef
  @ViewChild('img2') image2!: ElementRef
  @ViewChild('img3') image3!: ElementRef





  constructor(private productsservice: ProductsService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
  }

  ngOnInit(): void {
    //get one product from home//
    this.productsservice.getData().subscribe(res => {
      this.products = res

      this.finalProduct = this.products.filter(p => {
        return p.recipe_id == this.id
      })
      this.viewImg = this.finalProduct[0].image_url[0]
    })
  }

  //plus +
  addOne(index: any) {
    this.amount++
  }

  //remove -
  removeOne(index: any) {
    if (this.amount > 1) {
      this.amount--
    }
  }

  //add product to cart//
  addItem(product: any) {
    var obj = { item: product, quantity: this.amount }
    if (localStorage.getItem('cart') != null) {
      this.cart = JSON.parse(localStorage.getItem('cart')!)
      var exist = this.cart.find(i => i.item.recipe_id == obj.item.recipe_id)
      if (exist) {
        alert('This recipe is aready added')
      } else {
        this.cart.push(obj)
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    } else {
      this.cart.push(obj)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }

  //functions for change photo by click//
  changePhoto1() {
    this.viewImg = this.image1.nativeElement.src
    console.log(this.viewImg);
  }
  changePhoto2() {
    this.viewImg = this.image2.nativeElement.src
    console.log(this.viewImg);
  }
  changePhoto3() {
    this.viewImg = this.image3.nativeElement.src
    console.log(this.viewImg);
  }


  //check if not login retern to login page//
  checkbtn() {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['/login'])
      localStorage.removeItem('cart')
    }
  }
}
