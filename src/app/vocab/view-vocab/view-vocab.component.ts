import {Component, Input} from '@angular/core';
import {Vocab} from '../vocab.model';
import {DataService} from '../../shared/data.service';
import {Router} from '@angular/router';
import {AudioService} from '../../shared/audio.service';
import {FileStorageService} from '../../shared/file-storage.service';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent {
  @Input() selectedVocab: Vocab;
  audioFilePathMp3: string;

  constructor(private dataService: DataService,
              private router: Router,
              private fileStorageService: FileStorageService,
              private audioService: AudioService) { }

  onUpdate() {
    this.selectedVocab.audioFilePathMp3 = this.audioFilePathMp3;
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

}

// TODO
// 4) Change vocabulary data structure to allow children vocabulary items and positions
// 5) Change view example line ui to play child vocabulary audio on click
// 6) Create lightbox to display within view example line ui when child vocabulary is clicked
// X) Should have option to add any entries to wordbank, but examples should be added automatically
