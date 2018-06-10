import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Vocab} from '../vocab.model';
import {DataService} from '../../shared/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent {
  @Input() selectedVocab: Vocab;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() { }

  onUpdate() {
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


}
