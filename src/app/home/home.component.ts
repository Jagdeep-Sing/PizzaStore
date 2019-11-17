import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from "jquery";

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
  addedItemKeys: string[];
  drawerImage: any;
  drawerPtitle: any;
  drawerDescription: any;
  radioValue = '';
  drawerPrice: any;
  drawerId: any;
  constructor(private quoteService: QuoteService,
    private message: NzMessageService) { }

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

    // loader for some secs manually. because API request not there
    setTimeout(function() {
      $(".se-pre-con").fadeOut("slow");;
    }, 1000);

  }

  // Clicking on pizza will open the left side drawer. Handle events here
  openDrawer(price: any, title: any, id: any, image: any, desc: any): void {
    this.visible = true;
    this.customizeTitle = "Customize your " + title;
    this.drawerImage = image;
    this.drawerPtitle = title;
    this.drawerDescription = desc;
    this.drawerPrice = +price;
    this.drawerId = id;
  }

  //
  addtoCart(price: any, title: any, id: any): void {
    // Subtotal
    this.globalPrice += +price;

    // If same pizza already added to cart, inceare the quantity and add price
    if (this.cartObj[id] !== undefined) {
      this.cartObj[id].qty++;
      let tempPrice = parseInt(this.cartObj[id].price) + +price;
      this.cartObj[id].price = tempPrice;
      this.message.create('success', `${this.cartObj[id].qty} ${this.cartObj[id].size} Pizzas added to cart`);

    } else {
      this.cartObj[id] = { "price": price, "title": title, "_id": id, "qty": 1, size: 'regular' };
      this.message.create('success', `${this.cartObj[id].size} size pizza added to cart`);

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
  getSelectedSize(price: number, size: any): void {
    console.log(price)
    let cstmId;

    /** Default size is regular, if it is then maintain the
     * same id otherwise create different id. Creating different id
     * for different size will add pizza to cart as separate from other sizes
     **/

    if (size === 'regular') {
      cstmId = this.drawerId;
    } else {
      cstmId = this.drawerId + size
    }

    if (this.cartObj[cstmId] !== undefined) {
      this.cartObj[cstmId].qty++;
      this.message.create('success', `${this.cartObj[cstmId].qty} ${this.cartObj[cstmId].size} Pizzas added to cart`);
      let tempPrice = parseInt(this.cartObj[cstmId].price) + +price;
      this.cartObj[cstmId].price = tempPrice;
    } else {
      this.cartObj[cstmId] = { "price": price, "title": this.drawerPtitle, "_id": cstmId, "qty": 1, size: size };
      this.message.create('success', `${this.cartObj[cstmId].size} size pizza added to cart`);
    }
    this.globalPrice += +price;
    this.addedItemKeys = Object.keys(this.cartObj);

  }
}
