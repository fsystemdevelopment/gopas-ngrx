import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Ticket } from "../../store/models/ticket.model";
import { TicketsState } from "../../store/states/tickets.state";
import * as TicketActions from "../../store/states/tickets.state";

@Component({
  selector: "app-home-sidebar",
  templateUrl: "./home-sidebar.component.html",
  styleUrls: ["./home-sidebar.component.css"]
})
export class HomeSidebarComponent implements OnInit {
  tickets$: Observable<Ticket[]>;

  constructor(private store: Store<TicketsState>) {
    this.tickets$ = store.select("ticket");
    console.log(this.tickets$);
  }

  ngOnInit() {}
}
