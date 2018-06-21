import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vocab } from '../vocab.model';
import { IdGenService } from '../../shared/id-gen.service';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { FileStorageService } from '../../shared/file-storage.service';

@Component({
  selector: 'app-add-vocab',
  templateUrl: './add-vocab.component.html',
  styleUrls: ['./add-vocab.component.css']
})
export class AddVocabComponent implements OnInit {
  audioFilePathMp3: string;

  constructor(private uuidService: IdGenService,
              private dataService: DataService,
              private fileStorageService: FileStorageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const newVocab = new Vocab(
      form.form.value.target,
      form.form.value.targetKana,
      form.form.value.targetRomanization,
      form.form.value.english);
    newVocab.id = this.uuidService.generateUniqueId();
    newVocab.audioFilePathMp3 = this.audioFilePathMp3;
    this.dataService.createVocab(newVocab)
      .subscribe(
        () => {
          this.router.navigate(['/vocabulary']);
        },
        (err: any) => console.error(err)
      );
  }

  onSelectFile(fileInput: any) {
    this.fileStorageService.upload(fileInput);
    this.audioFilePathMp3 = fileInput.target.files[0].name;
  }

}
