import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeDetailComponent } from "./home-detail/home-detail.component";
import { HomeSidebarComponent } from "./home-sidebar/home-sidebar.component";
import { HomeComponent } from "./home.component";
import { SharedMaterialModule } from "../shared-material/shared-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent, HomeDetailComponent, HomeSidebarComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {}
