import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MapComponent } from '../map.component';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.css']
})
export class FromToComponent implements OnInit {
  @ViewChild('vanInput') el:ElementRef;



  constructor() { }
    //
  ngOnInit() {
    
  
  }
  ngAfterViewInit(){
    Observable.fromEvent(this.el, 'keyup').debounceTime(1000).subscribe(value => {
      console.log(this)
    }) 
  }
  
  public findRoute(){
    console.log(this.van, this.naar);
  }
 
  public suggestVan() {
    const suggestUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?';
  }
}
