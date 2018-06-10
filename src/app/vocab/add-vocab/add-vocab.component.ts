import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vocab } from '../vocab.model';
import { IdGenService } from '../../shared/id-gen.service';
import { Router } from '@angular/router';
import {DataService} from '../../shared/data.service';

@Component({
  selector: 'app-add-vocab',
  templateUrl: './add-vocab.component.html',
  styleUrls: ['./add-vocab.component.css']
})
export class AddVocabComponent implements OnInit {

  constructor(private uuidService: IdGenService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const newVocab = new Vocab(
      form.form.value.target,
      form.form.value.targetKana,
      form.form.value.targetRomanization,
      form.form.value.english);
    newVocab.id = this.uuidService.generateUniqueId();
    this.dataService.createVocab(newVocab)
      .subscribe(
        () => {
          this.router.navigate(['/vocabulary']);
        },
        (err: any) => console.error(err),
        () => console.log('Completed creating vocabulary item.')
      );
  }
}
