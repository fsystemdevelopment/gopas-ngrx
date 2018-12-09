import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Ticket } from "../../store/models/ticket.model";
import { TicketsState } from "../../store/states/tickets.state";
import * as TicketActions from "../../store/actions/ticket.action";

//service
import { ShareTicketIdService } from "../../services/share-ticket-id.service";

@Component({
  selector: "app-home-sidebar",
  templateUrl: "./home-sidebar.component.html",
  styleUrls: ["./home-sidebar.component.css"]
})
export class HomeSidebarComponent implements OnInit {
  tickets$: Observable<Ticket[]>;

  constructor(
    private store: Store<TicketsState>,
    private shareTicketIdService: ShareTicketIdService
  ) {
    this.tickets$ = store.select("ticket");
  }

  ngOnInit() {}

  deleteTicket(index) {
    this.store.dispatch(new TicketActions.RemoveTicket(index));
  }

  editTicket(index) {
    console.log("index: ", index);
    this.shareTicketIdService.changeData(index);
  }
}
