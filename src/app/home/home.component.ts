import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  allData: any[] = []
  filterName: any
  filterPrice: any
  searchValue: string = ''
  filteredData: any[] = []
  viewData: any[] = []
  Larr: any[] = []


  form: any = FormGroup
  formprice: any = FormGroup
  category: Array<any> = [
    { name: 'All', value: 'All' },
    { name: 'seafood-fish', value: 'fish' },
    { name: 'pizza', value: 'pizza' },
    { name: 'pasta', value: 'pasta' },
    { name: 'salad', value: 'salad' },
    { name: 'meat', value: 'meat' },
    { name: 'chicken', value: 'chicken' },
    { name: 'baked', value: 'baked' }
  ]
  categoryValue: string = ''

  price: Array<any> = [
    { name: 'Price 10-30', value: 20 },
    { name: 'Price 20-40', value: 30 },
    { name: 'Price 30-50', value: 40 },
    { name: 'Price 40-60', value: 50 },
    { name: 'Price 50-70', value: 60 },
    { name: 'Price 60-80', value: 70 },
  ]
  currentValue: any = 0;


  @ViewChild('section1') sec1!: ElementRef

  constructor(private productsservice: ProductsService, private fb: FormBuilder,private route:Router) {
    this.form = fb.group({
      category: new FormArray([])
    });

    this.formprice = fb.group({
      price: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.productsservice.getData().subscribe(data => {
      this.allData = data
      this.viewData = this.allData
    })
    this.cartData()
  }
  
  //number products in cart//
  cartData() {
    if (!localStorage.getItem('cart')) {
      this.Larr = []
    } else {
      this.Larr = JSON.parse(localStorage.getItem('cart')!)
    }
  }

  
  logout() {
    localStorage.clear()
    this.route.navigate(['/login'])
  }

  //filter products by category//
  onCheckboxChange(event: any) {
    const selectedSlides = (this.form.controls['category'] as FormArray);
    if (event.target.checked) {
      this.categoryValue = event.target.value
    }
  }

  //filter products by price//
  onCheckboxChangePrice(event: any) {
    const selectedSlides1 = (this.formprice.controls['price'] as FormArray);
    if (event.target.checked) {
      this.currentValue = event.target.value
    }
  }

  //search by category name//
  searchData() {
    this.viewData = this.allData.filter(s => {
      return s.category.toLowerCase().trim().includes(this.searchValue.toLowerCase().trim())
    })
    this.searchValue = ''
  }
}

