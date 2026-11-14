import { Component, ElementRef, inject, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-menu-suspenso',
  templateUrl: './menu-suspenso.html',
  host: {
    '(document:click)': 'cliqueFora($event)',
  },
})
export class MenuSuspenso {
  rotulo = input<string>('Escolha');
  opcoes = input<string[]>([]);
  escolheu = output<string>();

  aberto = signal(false);

  private elemento = inject(ElementRef);

  alternar(): void {
    this.aberto.set(!this.aberto());
  }

  escolher(opcao: string): void {
    this.escolheu.emit(opcao);
    this.aberto.set(false);
  }

  cliqueFora(evento: Event): void {
    if (!this.elemento.nativeElement.contains(evento.target)) {
      this.aberto.set(false);
    }
  }
}
