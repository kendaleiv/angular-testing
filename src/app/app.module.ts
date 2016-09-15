import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrentResultsComponent } from './current-results.component';
import { ResultsLogComponent } from './results-log.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentResultsComponent,
    ResultsLogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
