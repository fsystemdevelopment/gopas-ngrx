import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule, MetaReducer } from "@ngrx/store";

import { environment } from "../environments/environment.prod";

//reducers
import { TicketReducer } from "./store/reducers/ticket.reducer";

//service
import { PriceService } from "./services/price.service";
import { ShareTicketIdService } from "./services/share-ticket-id.service";

//not in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze"; //ngrx-store-freeze is a meta-reducer that prevents state from being mutated, only for developmment

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        ticket: TicketReducer
      },
      { metaReducers }
    ),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [PriceService, ShareTicketIdService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
