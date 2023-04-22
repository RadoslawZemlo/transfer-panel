import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { File } from 'src/app/interfaces/file.interface';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private filesUrl = 'http://localhost:3000/files';

  private sourceFiles$ = new BehaviorSubject<File[]>([]);
  files$ = this.sourceFiles$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getFiles(): void {
    this.http
      .get<File[]>(this.filesUrl)
      .pipe(take(1))
      .subscribe((files: File[]) => this.sourceFiles$.next(files));
  }
}
