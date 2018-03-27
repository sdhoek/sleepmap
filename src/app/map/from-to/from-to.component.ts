import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../shared/app-http.service';
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
  public vanSuggests = [];
  private naarSubject = new Subject();
  public naarSuggests = [];
  constructor(private http: AppHttpService) {

  }
  ngOnInit() {
    this.vanSubject.debounceTime(500).subscribe((event: any) => {
      // Initialize search here.
     this.getVanSuggest(event.target.value)
    });
    this.naarSubject.debounceTime(500).subscribe((event: any) => {
      // Initialize search here.
     this.getNaarSuggest(event.target.value)
    });
  }

  public vanUp(event: Event) {
    this.vanSubject.next(event);
  }
  public naarUp(event: Event) {
    this.naarSubject.next(event);
  }

  public getVanSuggest(van) {
    const suggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?'
    this.http.get(suggestUrl+'q='+van).then(r=>{
      this.vanSuggests = r.response.docs;
    })
  }

  public getNaarSuggest(naar) {
    const suggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?'
    this.http.get(suggestUrl+'q='+naar).then(r=>{
      this.naarSuggests = r.response.docs;
    })
  }
}
