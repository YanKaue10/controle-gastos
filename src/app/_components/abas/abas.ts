import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-abas',
  templateUrl: './abas.html',
})
export class Abas {
  titulos = input<string[]>([]);
  ativa = model<number>(0);

  selecionar(indice: number): void {
    this.ativa.set(indice);
  }
}
