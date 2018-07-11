import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Vocab } from '../../../shared/vocab.model';
import { FileStorageService } from '../../../shared/file-storage.service';
import { VocabService } from '../../../shared/vocab.service';

@Component({
  selector: 'app-admin-create-vocab',
  templateUrl: './admin-create-vocab.component.html',
  styleUrls: ['./admin-create-vocab.component.css']
})
export class AdminCreateVocabComponent implements OnInit {
  audioFilePathMp3: string;

  constructor(private vocabService: VocabService,
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
    newVocab.audioFilePathMp3 = this.audioFilePathMp3;
    this.vocabService.create(newVocab)
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
