// Section 1
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Ticket } from "../../store/models/ticket.model";

// Section 2
export const ADD_TICKET = "[TICKET] Add";

// Section 3
export class AddTicket implements Action {
  readonly type = ADD_TICKET;
  constructor(public payload: Ticket) {}
}

// Section 4
export type Actions = AddTicket;
