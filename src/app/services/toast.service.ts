import { Injectable, signal } from '@angular/core';

export type TipoToast = 'sucesso' | 'erro' | 'info';

export interface Toast {
  texto: string;
  tipo: TipoToast;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly mensagens = signal<Toast[]>([]);

  mostrar(texto: string, tipo: TipoToast = 'info'): void {
    const toast: Toast = { texto, tipo };
    this.mensagens.update((lista) => [...lista, toast]);

    setTimeout(() => this.fechar(toast), 3000);
  }

  fechar(toast: Toast): void {
    this.mensagens.update((lista) => lista.filter((t) => t !== toast));
  }
}
