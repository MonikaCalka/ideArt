import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  languages : any;
  onChangeLang : any;
  selectedLang : any;

  constructor(private breakpointObserver: BreakpointObserver, translate: TranslateService) {
    this.languages = translate.getLangs();
    this.selectedLang = translate.currentLang;
    

    this.onChangeLang = function (data: any) {
      translate.use(data.value);
      this.selectedLang = data.value;
    }
  }



}