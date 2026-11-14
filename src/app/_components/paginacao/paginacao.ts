import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.html',
})
export class Paginacao {
  totalPaginas = input<number>(1);
  paginaAtual = input<number>(1);
  mudou = output<number>();

  paginas = computed(() => {
    const lista: number[] = [];
    for (let i = 1; i <= this.totalPaginas(); i++) {
      lista.push(i);
    }
    return lista;
  });

  irPara(numero: number): void {
    if (numero >= 1 && numero <= this.totalPaginas()) {
      this.mudou.emit(numero);
    }
  }
}
