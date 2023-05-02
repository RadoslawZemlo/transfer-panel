import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  concatMap,
  interval,
  map,
  of,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { FilesService } from '@services/files/files.service';
import { DevicesService } from '@services/devices/devices.service';
import { File } from '@interfaces/file.interface';
import { Device, DeviceFile } from '@interfaces/device.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit, OnDestroy {
  files$: Observable<File[]> = this.filesService.files$;
  devices$: Observable<Device[]> = this.devicesService.devices$;

  private downloadQueue$ = new Subject<{ file: File; device: Device }>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly filesService: FilesService,
    private readonly devicesService: DevicesService
  ) {}

  ngOnInit(): void {
    this.filesService.getFiles();
    this.devicesService.getDevices();

    this.downloadQueue$
      .pipe(
        concatMap(({ file, device }) => {
          return this.downloadFile(file, device);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private addToDownloadQueue(file: File, device: Device): void {
    this.downloadQueue$.next({ file, device });
  }

  private downloadFile(file: File, device: Device): Observable<void> {
    const fileToDownload = device.files.find(
      (f: DeviceFile) => f.id === file.id
    );

    if (fileToDownload) {
      return interval(1000).pipe(
        tap(() => {
          if (fileToDownload.progress < 1) {
            fileToDownload.progress += device.download / file.size;

            if (fileToDownload.progress >= 1) {
              fileToDownload.progress = 1;

              this.devicesService
                .updateDevice(device)
                .pipe(take(1))
                .subscribe();
            }
          }
        }),
        takeWhile(() => fileToDownload.progress < 1, true),
        map(() => undefined)
      );
    }

    return of(undefined);
  }

  addFileToDevice(file: File): void {
    this.devices$
      .pipe(
        tap((devices) => {
          devices.forEach((device) => {
            if (!device.files.find((f: DeviceFile) => f.id === file.id)) {
              device.files.push({ id: file.id, progress: 0 });

              this.devicesService
                .updateDevice(device)
                .pipe(take(1))
                .subscribe(() => {
                  this.addToDownloadQueue(file, device);
                });
            }
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  filesTrackBy(index: number, file: File) {
    return file.id;
  }

  devicesTrackBy(index: number, device: Device) {
    return device.id;
  }

  deviceFilesTrackBy(index: number, deviceFile: DeviceFile) {
    return deviceFile.id;
  }
}
