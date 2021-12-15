import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Compra } from '../model/compra';
import { ComprasService } from '../services/compras.service';
import { Observable } from 'rxjs';

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
  compras: Compra[] = [];
  compras$: Observable<Compra[]>;

  public displayedColumns: string[] = ['title'];

  constructor(
    private comprasService: ComprasService
  ) {
    this.compras$ = this.comprasService.findAll();
  }

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
       this.consultarCompras();
    });

    form.resetForm();

  }

  consultarCompras() {
    this.compras$ = this.comprasService.findAll();
  }

  check(id: string) {
    console.log('update Item: ' + id);
    this.comprasService.updateItem(id, this.compras).subscribe(data => {
        this.consultarCompras();
    })
  }

  delete(id: string) {
    console.log('Delete Item: ' + id);
    this.comprasService.deleteItem(id).subscribe(data => {
      this.consultarCompras();
    });
  }

}
