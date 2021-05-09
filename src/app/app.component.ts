import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BitlyService } from './service/bitly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shorter-app';
  isCopied = false;
  formShorter!: FormGroup;
  reg = "((http|https)://)(www.)?"
  + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
  + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
  constructor(private fb: FormBuilder,
    private bitlyService: BitlyService,
    private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.formShorter = this.fb.group({
      longLink: ['', [Validators.required, Validators.pattern(this.reg)]],
      shortLink: new FormControl({value: null, disabled: true})
    });
  }

  onSubmit(form: FormGroup) {
    this.isCopied = false
    this.bitlyService.shortUrl(form.value['longLink']).subscribe(({link})=>{
      console.log(link);
      this.formShorter.patchValue({
        shortLink: link
      })
    })
  }

  setCopied() {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);

  }


}
