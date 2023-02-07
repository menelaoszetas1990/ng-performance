import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

// import { FlightBookingModule } from './flight-booking/flight-booking.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';

import { APP_ROUTES } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    QuicklinkModule,
    // FlightBookingModule,
    RouterModule.forRoot(APP_ROUTES, {
      // useHash: true,
      // enableTracing: true,
      preloadingStrategy: QuicklinkStrategy
    })
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
