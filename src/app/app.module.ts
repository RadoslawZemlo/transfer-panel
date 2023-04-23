import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FilesService } from './services/files/files.service';
import { DevicesService } from '@services/devices/devices.service';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { FileNamePipe } from './pipes/file-name/file-name.pipe';

@NgModule({
  declarations: [AppComponent, PanelComponent, FileNamePipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [FilesService, DevicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
