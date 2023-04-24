import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, take } from 'rxjs';
import { Device } from '@interfaces/device.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private devicesUrl = 'http://localhost:3000/devices';

  private sourceDevices$ = new BehaviorSubject<Device[]>([]);
  devices$ = this.sourceDevices$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getDevices(): void {
    this.http
      .get<Device[]>(this.devicesUrl)
      .pipe(take(1))
      .subscribe((devices: Device[]) => this.sourceDevices$.next(devices));
  }

  updateDevice(device: Device, updatedDevice: Device): void {
    const deviceUrl = `${this.devicesUrl}/${device.id}`;
    const request$ = this.http.put<Device>(deviceUrl, updatedDevice);

    combineLatest([this.devices$, request$])
      .pipe(take(1))
      .subscribe(([devices, updatedDevice]) => {
        const deviceIndex = devices.indexOf(device);

        devices.splice(deviceIndex, 1, updatedDevice);

        this.sourceDevices$.next([...devices]);
      });
  }

  updateDevices(fileId: number): void {
    this.devices$.pipe(take(1)).subscribe((devices) => {
      return devices.map((device) => {
        const isContainFile = device.files.find((file) => file.id === fileId);

        if (!isContainFile) {
          const updatedDevice = {
            ...device,
            files: [
              ...device.files,
              {
                id: fileId,
                progress: 0,
              },
            ],
          };

          this.updateDevice(device, updatedDevice);

          return updatedDevice;
        }

        return device;
      });
    });
  }
}
