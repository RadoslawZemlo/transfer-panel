import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
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
}
