import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateDefaultsAction } from '../../core/reducers/defaults.store';
import { UpdateDraftAction, ResetDraftAction } from '../../core/reducers/draft.store';
import { first, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  public error: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.store.select('defaults').pipe(
      first(),
      mergeMap(
        defaults => {
          return this.store.select('draft').pipe(
            first(),
            map(draft => {
              return {
                ...defaults,
                ...draft
              }
            })
          )
        }
      )
    ).subscribe(
      defaults => {
        this.form.patchValue(defaults)
      }
    );
  }

  private buildForm(): void {
    this.form = this.fb.group({
      domain: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      subject: [null, Validators.required],
      text: [null, Validators.required]
    });
    this.form.valueChanges.subscribe(changes => {
      this.setDraft(changes);
    })
  }

  public send(): void {
    if(this.loading) return;
    if(!this.form.valid) {
      Object.keys(this.form.controls).map(key => this.form.get(key).markAsDirty())
      return;
    }
    this.loading = true;
    this.setDefaults();
    let data = { ...this.form.value };
    delete data.domain;
    this.dataService.sendMessage(
      this.form.value.domain,
      data
    ).subscribe(
      res => {
        this.resetDraft();
        this.loading = false;
        this.router.navigate(['/']);
      },
      err => {
        console.error(err);
        this.error = err;
        this.loading = false;
      }
    )
  }

  public resetDraft(): void {
    this.form.get('to').reset();
    this.form.get('subject').reset();
    this.form.get('text').reset();
    this.store.dispatch(new ResetDraftAction());
  }

  public setDraft(value): void {
    this.store.dispatch(new UpdateDraftAction(value))
  }

  public setDefaults(): void {
    this.store.dispatch(new UpdateDefaultsAction({
      domain: this.form.value.domain,
      from: this.form.value.from
    }))
  }

}
