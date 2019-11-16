import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  visible = false;
  placement = 'left';
  tableLoader = false;
  tableSize = "small";
  customizeTitle = ""

  vegPdata: any = [
    {
      "title": "Deluxe Veggie",
      "desc": "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese 1",
      "price": "270",
      "image": "https://images.dominos.co.in/new_deluxe_veggie.jpg",
      "size": "regular",
      "_id": "981"
    },
    {
      "title": "Indi Tandoori Paneer",
      "desc": "Fresh onions, capsicum, olives, grilled mushroom, corn, tomato, jalapeno & extra cheese 2",
      "price": "300",
      "image": "https://images.dominos.co.in/IndianTandooriPaneer.jpg",
      "size": "regular",
      "_id": "982"
    },
    {
      "title": "Veg Extravaganza",
      "desc": "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
      "price": "250",
      "image": "https://images.dominos.co.in/new_veg_extravaganza.jpg",
      "size": "regular",
      "_id": "983"
    }
  ];

  nonvegPdata: any = [
    {
      "title": "Chicken Pepperoni",
      "desc": "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
      "price": "500",
      "image": "https://images.dominos.co.in/cheesepepperoni.png",
      "size": "regular",
      "_id": "090"
    },
    {
      "title": "Indi Chicken Tikka",
      "desc": "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
      "price": "435",
      "image": "https://images.dominos.co.in/IndianTandooriChickenTikka.jpg",
      "size": "regular",
      "_id": "091"
    },
    {
      "title": "Non Veg Supreme",
      "desc": "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
      "price": "300",
      "image": "https://images.dominos.co.in/new_non_veg_supreme.jpg",
      "size": "regular",
      "_id": "092"
    }
  ];
  globalPrice = 0;

  cartObj: any = [];
  tempIndex = 0;
  addedItemKeys: string[];
  drawerImage: any;
  drawerPtitle: any;
  drawerDescription: any;
  radioValue = 'A';
  drawerPrice: any;
  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  open(price: any, title: any, id: any, image: any, desc: any): void {
    this.visible = true;
    this.customizeTitle = "Customize your "+ title;
    this.drawerImage = image;
    this.drawerPtitle = title;
    this.drawerDescription = desc;
    this.drawerPrice = +price;
  }
  addtoCart(price: any, title: any, id: any): void{
   // this.tableLoader = true;
    this.globalPrice += +price;
    if(this.cartObj[id] !== undefined) {
      this.cartObj[id].qty++;
      let tempPrice = parseInt(this.cartObj[id].price) + +price;
      this.cartObj[id].price = tempPrice;
    } else{
      this.cartObj[id] = {"price": price,"title": title,"_id": id,"qty": 1, "index":this.tempIndex};
      this.tempIndex++;
    }

    this.addedItemKeys = Object.keys(this.cartObj);
    console.log(this.addedItemKeys)

  }

  close(): void {
    this.visible = false;
  }
  checkChange(e: boolean): void {
    console.log(e);
  }
  getSelectedSize(price: number): void{
    console.log(price)

  }
}
