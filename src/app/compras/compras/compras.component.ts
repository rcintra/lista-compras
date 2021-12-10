import { Component, OnInit } from '@angular/core';
import { Compra } from '../model/compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  public compras: Compra[] = [
    { id: "1", title: "item 1", complete: false },
    { id: "2", title: "item 2", complete: false },
    { id: "3", title: "item 23", complete: false }
  ];
  public displayedColumns: string[] = ['title'];

  constructor() { }

  ngOnInit(): void {

  }

  check(id: string){
    this.compras.filter( c => (c.id === id) ? c.complete = !c.complete : '');
    console.log(this.compras);
  }
  delete(){}

}
