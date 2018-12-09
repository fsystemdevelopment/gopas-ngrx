import { Ticket } from '../models/ticket.model';

export interface TicketsState {
  readonly ticket: Ticket[];
}