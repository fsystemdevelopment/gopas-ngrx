import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
  FormBuilder
} from "@angular/forms";

//services
import { PriceService } from "./../../services/price.service";
import { Store } from "@ngrx/store";
import * as TicketActions from "./../../store/actions/ticket.action";
import { TicketsState } from "src/app/store/states/tickets.state";

export interface PersonForm {
  firstName: string;
  surname: string;
  age: number;
}

@Component({
  selector: "app-home-detail",
  templateUrl: "./home-detail.component.html",
  styleUrls: ["./home-detail.component.css"]
})
export class HomeDetailComponent implements OnInit {
  products: any;
  private payloadPersonForm: any;

  personForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    surname: ["", Validators.required],
    age: ["", Validators.required]
  });

  constructor(
    private store: Store<TicketsState>,
    private formBuilder: FormBuilder,
    private priceService: PriceService
  ) {}

  ngOnInit() {}

  chooseProduct(e, product) {
    e.preventDefault();
    console.log("chooseProduct: ", product);
    this.payloadPersonForm["productName"] = product["productName"];
    this.payloadPersonForm["price"] = product["price"];
    this.store.dispatch(new TicketActions.AddTicket(this.payloadPersonForm));
  }

  async onSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (valid) {
      this.products = await this.priceService.getPrice(value.age);
      this.payloadPersonForm = value;
    }
  }
}
