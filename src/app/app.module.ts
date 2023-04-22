import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FilesService } from './services/files/files.service';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [AppComponent, PanelComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [FilesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
