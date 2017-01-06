import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrentResultsComponent } from './current-results.component';
import { ResultsLogComponent } from './results-log.component';

import { StockRetrieverService } from './stock-retriever.service';

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
  providers: [
    StockRetrieverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
