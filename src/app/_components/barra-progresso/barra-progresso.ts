import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-barra-progresso',
  templateUrl: './barra-progresso.html',
})
export class BarraProgresso {
  valor = input<number>(0);

  largura = computed(() => Math.min(this.valor(), 100));

  porcentagem = computed(() => Math.round(this.valor()));

  cor = computed(() => {
    if (this.valor() >= 100) return 'from-rose-500 to-red-500';
    if (this.valor() >= 70) return 'from-amber-400 to-orange-500';
    return 'from-emerald-400 to-cyan-400';
  });
}
