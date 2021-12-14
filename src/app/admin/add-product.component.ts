import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/Product.model';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/model/Category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  category:Category[] = [];
  prodcut:Product = new Product();
  base64textString:string;

  constructor(private service:AdminService, private router:Router,
    private spinner:NgxSpinnerService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchCategory();
  }

  fetchCategory(){
    this.spinner.show();
    this.service.getCategory().subscribe((data)=>{
      this.category = data as Category[];
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

  handleFileSelect(evt) {
    this.base64textString = "";
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    this.prodcut.ProductImage = this.base64textString
  }

  submit():void{
    this.spinner.show();
    this.service.addProduct(this.prodcut).subscribe((data)=>{
      let message = data.Message;
      if(message == 'Product added'){
        this.toastr.success(message,'Alert');
      }
      else{
        this.toastr.error(message,'Alert');
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    })
  }

}
