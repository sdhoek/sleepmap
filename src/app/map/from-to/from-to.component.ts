import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppHttpService } from '../../shared/app-http.service';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import { ActivatedRoute } from '@angular/router';

import { RoutingService } from '../../shared/routing.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.css']
})
export class FromToComponent implements OnInit, OnDestroy {
  //Observable.fromEvent(yourInput, 'keyup').debounceTime(1000).subscribe(value => /* */)
  private vanSubject = new Subject();
  public vanSuggests = [];
  private naarSubject = new Subject();
  private arParams = new Subscription();
  public naarSuggests = [];
  public vanLoc = [];
  public naar;
  public van;
  public naarLoc = [];
  public city = 'amsterdam';
  public suggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&q=';
  public locateUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=';
  public onbegluurd = false;
  constructor(private http: AppHttpService, private routingService: RoutingService, private ar: ActivatedRoute) {
  
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
    this.arParams = this.ar.params.subscribe((event: any) => {
      this.city = event.city;
      this.suggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:'+event.city+'&q='
    })
  }

  ngOnDestroy() {
    this.naarSubject.unsubscribe();
    this.vanSubject.unsubscribe();
    this.arParams.unsubscribe();
  }

  public vanUp(event: Event) {
    this.vanSubject.next(event);
  }
  public naarUp(event: Event) {
    this.naarSubject.next(event);
  }

  public setOnbegluurd(event: Event) {
    this.routingService.setBegluurdStatus(this.onbegluurd);
  }

  public getVanSuggest(van) {
    this.http.get(this.suggestUrl+van).then(r=>{
      this.vanSuggests = r.response.docs;
    })
  }

  public getNaarSuggest(naar) {
    this.http.get(this.suggestUrl+naar).then(r=>{
      this.naarSuggests = r.response.docs;
    })
  }

  public locateNaar(item) {
    this.naar = item.weergavenaam;
    this.http.get(this.locateUrl+item.id).then(r=>{
      let pt = r.response.docs[0].centroide_ll;
      this.naarLoc = [parseFloat(pt.split('(')[1].split(' ')[0]),parseFloat(pt.split('(')[1].split(' ')[1].split(')')[0])]
      this.naarSuggests = [];
    })
    this.routingService.setNaar(this.naarLoc)
  }

  public locateVan(item) {
    this.van = item.weergavenaam;
    this.http.get(this.locateUrl+item.id).then(r=>{
      let pt = r.response.docs[0].centroide_ll;
      this.vanLoc = [parseFloat(pt.split('(')[1].split(' ')[0]),parseFloat(pt.split('(')[1].split(' ')[1].split(')')[0])]
      this.vanSuggests = [];
    })
    this.routingService.setVan(this.vanLoc)
  }

  public findRoute() {
    this.routingService.findRoute(this.vanLoc,this.naarLoc,this.city)
  }
}
