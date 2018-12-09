import { Ticket } from "../../store/models/ticket.model";
import * as TicketActions from "../actions/ticket.action";

// Section 2
export function TicketReducer(
  state: Ticket[] = [],
  action: TicketActions.Actions
) {
  // Section 3
  switch (action.type) {
    case TicketActions.ADD_TICKET:
      console.log(state);
      console.log("action.payload: ", action.payload);
      return [...state, action.payload];

    default:
      return state;
  }
}
