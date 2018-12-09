import { Ticket } from "../../store/models/ticket.model";
import * as TicketActions from "../actions/ticket.action";
import * as _ from "lodash";

export function TicketReducer(
  state: Ticket[] = [],
  action: TicketActions.Actions
) {
  switch (action.type) {
    case TicketActions.ADD_TICKET:
      return [...state, action.payload];

    case TicketActions.REMOVE_TICKET:
      state.splice(action.payload, 1);
      return state;

    case TicketActions.EDIT_TICKET:
      state[action.payload.index] = action.payload;
      delete action.payload.index; //do not save index to Store, should be done using Id from database for every product
      return state;

    default:
      return state;
  }
}
