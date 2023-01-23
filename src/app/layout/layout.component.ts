import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponseService } from '../services/interceptor/http-response.service';
import { CharapterService } from '../services/charapter.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private charapterService: CharapterService) { }


  ngOnInit(): void {
    this.charapterService.messageErrorHttp.subscribe(message => {
      this.openSnackBar(message);
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(`Error: ${message}`, 'OK', {
      duration: 4000,
    });
  }
}
