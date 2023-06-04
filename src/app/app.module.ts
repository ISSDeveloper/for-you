import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ForYouModule } from './modules/for-you/for-you.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ForYouModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
