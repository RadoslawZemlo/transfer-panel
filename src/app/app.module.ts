import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilesService } from './services/files/files.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [FilesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
