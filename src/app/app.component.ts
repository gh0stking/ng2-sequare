import { Component } from '@angular/core';

import { SequareComponent } from '../components/sequare.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }

  boxSelected(box): void {
    console.log(box);
    //do something...
  }
  
}
