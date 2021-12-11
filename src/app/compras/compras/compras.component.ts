import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Compra } from '../model/compra';
import { ComprasService } from '../services/compras.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  public compras: Compra[] = [];

  public displayedColumns: string[] = ['title'];

  constructor(
    private comprasService: ComprasService
  ) { }

  ngOnInit(): void {
    this.consultarCompras();
  }

  onSubmit(form: NgForm) {
    console.log(form.value.title);

    let itemObj: any = {
      title: form.value.title,
      complete: false
    }

    this.comprasService.addItem(itemObj).subscribe((res) => {
      console.log(res);
    });

    form.resetForm();

    this.consultarCompras();

  }

  consultarCompras() {
    this.comprasService.findAll().subscribe((res) => {
      this.compras = res;
    })
  }

  check(id: string) {
    console.log('update Item: ' + id);
    this.compras.filter( c => (c.id === id)
      ? this.comprasService.updateItem(id).subscribe()
      : console.log('Compra nao encontrada'));
    this.consultarCompras();
  }

  delete(id: string) {
    console.log('Delete Item: ' + id);
    this.comprasService.deleteItem(id).subscribe();
    this.consultarCompras();
  }

}
