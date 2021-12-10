import { Component, OnInit } from '@angular/core';
import { Compra } from '../model/compra';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  public compras: Compra[] = [];

  public displayedColumns: string[] = ['title'];

  constructor(
    private comprasService: ComprasService
  ) { }

  ngOnInit(): void {
    this.consultarCompras();
  }

  consultarCompras() {
    this.comprasService.findAll().subscribe((res) => {
      this.compras = res;
    })
  }

  check(id: string) {
    this.compras.filter( c => (c.id === id) ? c.complete = !c.complete : '');
    console.log(this.compras);
  }

  delete() {}

}
