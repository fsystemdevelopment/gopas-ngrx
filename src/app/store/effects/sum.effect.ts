import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, withLatestFrom, switchMap, filter } from "rxjs/operators";
import { TicketsState } from "../states/tickets.state";
import { PriceService } from "src/app/services/price.service";

@Injectable()
export class SumEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<TicketsState>,
    private priceService: PriceService
  ) {}

  @Effect({ dispatch: false }) sumAllTickets$ = this.actions$
    .ofType("[TICKET] Add", "[TICKET] Edit", "[TICKET] Remove")
    .pipe(
      withLatestFrom(this.store$.select("ticket")),
      map(res => res["1"]),
      switchMap(data => this.priceService.getDiscount(data))
    );
}
