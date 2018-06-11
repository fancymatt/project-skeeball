import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Vocab } from '../vocab.model';
import { DataService } from '../../shared/data.service';
import { AudioService } from '../../shared/audio.service';
import { FileStorageService } from '../../shared/file-storage.service';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent implements OnInit {
  @Input() selectedVocab: Vocab;
  vocabForm: FormGroup;
  vocabList: Vocab[];
  audioFilePathMp3: string;

  get childVocabs(): FormArray {
    return <FormArray>this.vocabForm.get('childVocabs');
  }

  constructor(private dataService: DataService,
              private router: Router,
              private fileStorageService: FileStorageService,
              private formBuilder: FormBuilder,
              private audioService: AudioService) { }

  ngOnInit() {
    this.vocabForm = this.formBuilder.group({
      target: this.selectedVocab.target,
      targetKana: this.selectedVocab.targetKana,
      targetRomanization: this.selectedVocab.targetRomanization,
      english: this.selectedVocab.english,
      addChildren: false,
      childVocabs: this.populateChildVocabs()
    });
    this.dataService.getAllVocabs()
      .subscribe(
        (data) => this.vocabList = data,
        (err) => console.log(err),
        () => console.log('Finished fetching vocab list')
      );
  }

  onSaveVocabulary() {
    this.selectedVocab.audioFilePathMp3 = this.audioFilePathMp3;
    console.log(this.childVocabs.value);
    this.selectedVocab.childVocabs = this.childVocabs.value;
    this.dataService.updateVocab(this.selectedVocab)
      .subscribe(
        () => this.router.navigate(['..']),
        (err) => console.log(err),
        () => 'Finished updating vocab'
      );
  }

  onDelete() {
    this.dataService.deleteVocab(this.selectedVocab)
      .subscribe(
        () => {
          this.router.navigate(['..']);
        },
        (err) => console.log(err),
        () => console.log('Completed deleting vocab')
      );
  }

  onPlayAudio() {
    this.audioService.playVocabularyAudio(this.selectedVocab);
  }

  onSelectFile(fileInput: any) {
    const file = fileInput.target.files[0];
    this.fileStorageService.upload(file);
    this.audioFilePathMp3 = file.name;
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
    let array = this.formBuilder.array([])
    for (let i = 0; i < this.selectedVocab.childVocabs.length; i++) {
      array.push(this.formBuilder.group({
        id: this.selectedVocab.childVocabs[i].id,
        startChar: this.selectedVocab.childVocabs[i].startChar,
        endChar: this.selectedVocab.childVocabs[i].endChar
      }));
    }
    return array;
  }

}

// TODO
// 4) Change vocabulary data structure to allow children vocabulary items and positions
// 5) Change view example line ui to play child vocabulary audio on click
// 6) Create lightbox to display within view example line ui when child vocabulary is clicked
// X) Should have option to add any entries to wordbank, but examples should be added automatically

