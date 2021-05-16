import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BitlyService } from './service/bitly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shorter-app';
  formShorter!: FormGroup;
  laoding = false
  reg = "((http|https)://)(www.)?"
  + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
  + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
  constructor(private fb: FormBuilder,
              private bitlyService: BitlyService,
              private cdr: ChangeDetectorRef,
              private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.formShorter = this.fb.group({
      longLink: ['', [Validators.required, Validators.pattern(this.reg)]],
      shortLink: new FormControl({value: null, disabled: true})
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.laoding = true;
      this.bitlyService.shortUrl(form.value['longLink']).subscribe(({link})=>{
        this.formShorter.patchValue({
          shortLink: link
        })
        this.laoding = false;
      }, (error)=>{
        this._snackBar.open(error.message, `Error`)
        this.laoding = false;
      });
    } else {
      this._snackBar.open(`invalid URL`, `Error`)
    }
  }

  setCopied() {
    this._snackBar.open('Copied!');
  }


}
