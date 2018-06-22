import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Vocab } from '../vocab.model';
import { FileStorageService } from '../../shared/file-storage.service';
import { VocabService } from '../vocab.service';

@Component({
  selector: 'app-add-vocab',
  templateUrl: './add-vocab.component.html',
  styleUrls: ['./add-vocab.component.css']
})
export class AddVocabComponent implements OnInit {
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
