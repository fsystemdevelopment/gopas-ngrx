import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ShareTicketIdService {
  private ticketSource = new BehaviorSubject<any>("");
  currentTicket = this.ticketSource.asObservable();

  constructor() {}

  changeData(currentData: any) {
      this.ticketSource.next(currentData);
  }
}
