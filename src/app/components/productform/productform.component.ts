import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], // here we only import Modules , Modules include services ad injectables that we inject via constructor
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})
export class ProductformComponent implements OnInit {

  myForm!: FormGroup;

  // we will use this constructor to inject the service that will build our form group
  constructor(private fb : FormBuilder, private productService : ProductsService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.myForm = this.fb.group({
      name : ["", Validators.required],
      price : [0, Validators.required],
      quantity : [0, Validators.required],
      available : [true, Validators.required],
      selected : [true, Validators.required]

    });
    
  }

  onSubmit(){
    this.productService.createProduct(this.myForm.value).subscribe({
      next : data => {
        console.log(data);
      }
    })

  }

}
