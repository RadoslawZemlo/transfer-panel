interface DeviceFile {
  id: number;
  progress: number;
}

export interface Device {
  id: number;
  name: string;
  size: number;
  files: DeviceFile[];
}
