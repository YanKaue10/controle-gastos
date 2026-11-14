import { Injectable } from '@angular/core';
import { Despesa } from '../models/despesa';

@Injectable({ providedIn: 'root' })
export class DespesaService {
  private readonly CHAVE_DESPESAS = 'despesas';
  private readonly CHAVE_ORCAMENTO = 'orcamento';

  listar(): Despesa[] {
    const dados = localStorage.getItem(this.CHAVE_DESPESAS);
    return dados ? JSON.parse(dados) : [];
  }

  private salvarLista(lista: Despesa[]): void {
    localStorage.setItem(this.CHAVE_DESPESAS, JSON.stringify(lista));
  }

  adicionar(descricao: string, valor: number, categoria: string): Despesa[] {
    const nova: Despesa = {
      id: Date.now(),
      descricao,
      valor,
      categoria,
      data: new Date().toISOString(),
    };
    const lista = [nova, ...this.listar()];
    this.salvarLista(lista);
    return lista;
  }

  remover(id: number): Despesa[] {
    const lista = this.listar().filter((d) => d.id !== id);
    this.salvarLista(lista);
    return lista;
  }

  calcularTotal(lista: Despesa[]): number {
    let total = 0;
    for (const d of lista) {
      total += d.valor;
    }
    return total;
  }

  lerOrcamento(): number {
    return Number(localStorage.getItem(this.CHAVE_ORCAMENTO)) || 1000;
  }

  salvarOrcamento(valor: number): void {
    localStorage.setItem(this.CHAVE_ORCAMENTO, String(valor));
  }
}
