import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilesService } from '@services/files/files.service';
import { DevicesService } from '@services/devices/devices.service';
import { File } from '@interfaces/file.interface';
import { Device } from '@interfaces/device.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  files$: Observable<File[]> = this.filesService.files$;
  devices$: Observable<Device[]> = this.devicesService.devices$;

  constructor(
    private readonly filesService: FilesService,
    private readonly devicesService: DevicesService
  ) {}

  ngOnInit(): void {
    this.filesService.getFiles();
    this.devicesService.getDevices();
  }

  updateDevicesFiles(selectedFileId: number) {
    this.devicesService.updateDevices(selectedFileId);
  }
}
