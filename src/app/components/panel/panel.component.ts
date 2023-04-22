import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from '@services/files/files.service';
import { File } from '@interfaces/file.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  files$: Observable<File[]> = this.filesService.files$;

  constructor(private readonly filesService: FilesService) {}

  ngOnInit(): void {
    this.filesService.getFiles();
  }
}
