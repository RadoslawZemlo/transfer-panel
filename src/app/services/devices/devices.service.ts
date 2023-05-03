import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Device } from '@interfaces/device.interface';

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

  updateDevice(device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.devicesUrl}/${device.id}`, device);
  }
}
