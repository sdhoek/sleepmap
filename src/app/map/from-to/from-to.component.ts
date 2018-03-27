import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.css']
})
export class FromToComponent implements OnInit {
  //Observable.fromEvent(yourInput, 'keyup').debounceTime(1000).subscribe(value => /* */)
  private vanSubject = new Subject();

  constructor() { }
  ngOnInit() {
    this.vanSubject.debounceTime(500).subscribe((event: Event) => {
      // Initialize search here.

    });

  }

  public onKeyUp(event: Event) {
    this.vanSubject.next(event);
  }
}
