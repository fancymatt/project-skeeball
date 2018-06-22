import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Vocab } from '../vocab.model';
import { AudioService } from '../../shared/audio.service';
import { FileStorageService } from '../../shared/file-storage.service';
import { VocabService } from '../vocab.service';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})

export class ViewVocabComponent implements OnInit, OnChanges {
  @Input() selectedVocab: Vocab;
  vocabForm: FormGroup;
  vocabList: Vocab[];
  audioFilePathMp3: string;

  get childVocabs(): FormArray {
    return <FormArray>this.vocabForm.get('childVocabs');
  }

  constructor(private router: Router,
              private vocabService: VocabService,
              private fileStorageService: FileStorageService,
              private formBuilder: FormBuilder,
              private audioService: AudioService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.vocabService.getAll()
      .subscribe(
        data => this.vocabList = data,
        err => console.error(err)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedVocab = changes.selectedVocab.currentValue;
    this.initializeForm();
  }

  onSaveVocabulary() {
    this.selectedVocab.audioFilePathMp3 = this.audioFilePathMp3;
    console.log(this.childVocabs.value);
    this.selectedVocab.childVocabs = this.childVocabs.value;
    this.vocabService.update(this.selectedVocab)
      .subscribe(
        () => this.router.navigate(['..']),
        err => console.error(err)
      );
  }

  initializeForm() {
    this.vocabForm = this.formBuilder.group({
      target: this.selectedVocab.target,
      targetKana: this.selectedVocab.targetKana,
      targetRomanization: this.selectedVocab.targetRomanization,
      english: this.selectedVocab.english,
      audioFilePathMp3: this.selectedVocab.audioFilePathMp3,
      addChildren: false,
      childVocabs: this.populateChildVocabs()
    });
  }

  onDelete() {
    this.vocabService.delete(this.selectedVocab)
      .subscribe(
        () => this.router.navigate(['..']),
        err => console.error(err)
      );
  }

  onPlayAudio() {
    this.audioService.playVocabularyAudio(this.selectedVocab);
  }

  buildChildVocab(): FormGroup {
    return this.formBuilder.group({
      id: '',
      startChar: '',
      endChar: ''
    });
  }

  addChildVocab(): void {
    this.childVocabs.push(this.buildChildVocab());
  }

  populateChildVocabs(): FormArray {
    const array = this.formBuilder.array([]);

    if (this.selectedVocab.childVocabs) {
      for (let i = 0; i < this.selectedVocab.childVocabs.length; i++) {
        array.push(this.formBuilder.group({
          id: this.selectedVocab.childVocabs[i].id,
          startChar: this.selectedVocab.childVocabs[i].startChar,
          endChar: this.selectedVocab.childVocabs[i].endChar
        }));
      }
    }
    return array;
  }

}
