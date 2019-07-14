import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  @Input() shop: any;

  constructor() { }

  ngOnInit() {}

}
