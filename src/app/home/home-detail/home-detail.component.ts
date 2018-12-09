import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Ticket } from "../../store/models/ticket.model";
import { TicketsState } from "../../store/states/tickets.state";
import * as TicketActions from "../../store/actions/ticket.action";
import { PriceService } from "../../services/price.service";
import { ShareTicketIdService } from "../../services/share-ticket-id.service";

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
  @ViewChild("personFormCtrl") personFormCtrl;

  products: any;
  private payloadPersonForm: any;
  private updatedTicketId: any;
  tickets$: Observable<Ticket[]>;

  private shareTickedIdSubscription: Subscription;
  private ticketsData: any;
  editFlag: boolean;

  personForm = this.fb.group({
    firstName: ["", Validators.required],
    surname: ["", Validators.required],
    age: ["", Validators.required]
  });

  constructor(
    private store: Store<TicketsState>,
    private fb: FormBuilder,
    private priceService: PriceService,
    private shareTicketIdService: ShareTicketIdService
  ) {}

  ngOnInit() {
    this.tickets$ = this.store.select("ticket");
    this.tickets$.subscribe(res => (this.ticketsData = res as Ticket[]));

    this.shareTickedIdSubscription = this.shareTicketIdService.currentTicket.subscribe(
      id => {
        this.updatedTicketId = id;
        if (this.updatedTicketId !== "" && !!this.ticketsData) {
          this.initForm(this.ticketsData, this.updatedTicketId);
          this.setEditFlag(true);
        }
      }
    );
  }

  private initForm(res, index) {
    this.personForm.setValue({
      firstName: res[index]["firstName"],
      surname: res[index]["surname"],
      age: res[index]["age"]
    });
  }

  private clearPersonForm(): void {
    this.personFormCtrl.resetForm();
    this.personForm.reset();
    this.products = [];
  }

  private setEditFlag(value: boolean): void {
    this.editFlag = value;
  }

  async onSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (valid) {
      this.products = await this.priceService.getPrice(value.age);
      this.payloadPersonForm = value;
    }
  }

  closeEdit(): void {
    this.setEditFlag(false);
    this.updatedTicketId = null;
    this.clearPersonForm();
  }

  chooseProduct(e, product) {
    e.preventDefault();
    this.store.dispatch(
      new TicketActions.AddTicket({ ...this.payloadPersonForm, ...product })
    );
    this.clearPersonForm();
  }

  editProduct(e, product) {
    e.preventDefault();
    this.payloadPersonForm["productName"] = product["productName"];
    this.payloadPersonForm["price"] = product["price"];
    let payload = { ...this.payloadPersonForm, index: this.updatedTicketId };
    this.store.dispatch(new TicketActions.EditTicket(payload));
    this.clearPersonForm();
    this.setEditFlag(false);
  }

  ngOnDestroy() {
    this.shareTickedIdSubscription.unsubscribe();
  }
}
