import { Component, input, signal } from '@angular/core';

export interface ItemAcordeao {
  titulo: string;
  conteudo: string;
}

@Component({
  selector: 'app-acordeao',
  templateUrl: './acordeao.html',
})
export class Acordeao {
  itens = input<ItemAcordeao[]>([]);

  aberto = signal<number | null>(null);

  alternar(indice: number): void {
    this.aberto.set(this.aberto() === indice ? null : indice);
  }
}
