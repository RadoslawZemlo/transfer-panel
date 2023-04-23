import { Pipe, PipeTransform } from '@angular/core';
import { File } from '@interfaces/file.interface';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(deviceId: number, files: File[]): string {
    const file = files.find((file) => file.id === deviceId);

    return file ? file.name : 'file undefined';
  }
}
