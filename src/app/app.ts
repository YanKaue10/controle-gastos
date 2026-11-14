import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Despesa, CATEGORIAS, Categoria } from './models/despesa';
import { DespesaService } from './services/despesa.service';
import { ToastService } from './services/toast.service';
import { MoedaPipe } from './pipes/moeda.pipe';
import { DataPipe } from './pipes/data.pipe';

import { Abas } from './_components/abas/abas';
import { MenuSuspenso } from './_components/menu-suspenso/menu-suspenso';
import { Paginacao } from './_components/paginacao/paginacao';
import { BarraProgresso } from './_components/barra-progresso/barra-progresso';
import { Acordeao } from './_components/acordeao/acordeao';
import { NotificacaoToast } from './_components/notificacao-toast/notificacao-toast';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule, MoedaPipe, DataPipe,
    Abas, MenuSuspenso, Paginacao, BarraProgresso, Acordeao, NotificacaoToast,
  ],
  templateUrl: './app.html',
})
export class App {
  private despesaService = inject(DespesaService);
  private toast = inject(ToastService);

  categorias = CATEGORIAS;
  despesas = signal<Despesa[]>(this.despesaService.listar());
  orcamento = signal<number>(this.despesaService.lerOrcamento());

  descricao = '';
  valor: number | null = null;
  categoria = '';

  titulosAbas = ['Nova despesa', 'Minhas despesas', 'Ajuda'];
  abaAtual = signal(0);

  opcoesFiltro = ['Todas', ...CATEGORIAS.map((c) => c.nome)];
  categoriaFiltro = signal('Todas');

  itensPorPagina = 5;
  paginaAtual = signal(1);

  adicionar(): void {
    if (!this.descricao || !this.categoria || !this.valor || this.valor <= 0) {
      this.toast.mostrar('Preencha descrição, valor e categoria.', 'erro');
      return;
    }

    this.despesas.set(this.despesaService.adicionar(this.descricao, Number(this.valor), this.categoria));

    this.descricao = '';
    this.valor = null;
    this.categoria = '';
    this.toast.mostrar('Despesa salva com sucesso!', 'sucesso');
  }

  remover(despesa: Despesa): void {
    this.despesas.set(this.despesaService.remover(despesa.id));
    this.toast.mostrar(`Despesa "${despesa.descricao}" excluída.`, 'info');

    if (this.paginaAtual() > this.totalPaginas()) {
      this.paginaAtual.set(Math.max(1, this.totalPaginas()));
    }
  }

  filtrar(categoria: string): void {
    this.categoriaFiltro.set(categoria);
    this.paginaAtual.set(1);
    this.toast.mostrar('Mostrando: ' + categoria, 'info');
  }

  despesasFiltradas = computed(() => {
    if (this.categoriaFiltro() === 'Todas') {
      return this.despesas();
    }
    return this.despesas().filter((d) => d.categoria === this.categoriaFiltro());
  });

  totalPaginas = computed(() => Math.ceil(this.despesasFiltradas().length / this.itensPorPagina));

  despesasDaPagina = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    return this.despesasFiltradas().slice(inicio, inicio + this.itensPorPagina);
  });

  totalGeral = computed(() => this.despesaService.calcularTotal(this.despesas()));
  totalFiltrado = computed(() => this.despesaService.calcularTotal(this.despesasFiltradas()));
  restante = computed(() => this.orcamento() - this.totalGeral());

  mudarOrcamento(valor: number): void {
    this.orcamento.set(valor);
    if (valor > 0) {
      this.despesaService.salvarOrcamento(valor);
    }
  }

  percentualGasto = computed(() => {
    if (!this.orcamento()) return 0;
    return (this.totalGeral() / this.orcamento()) * 100;
  });

  infoCategoria(nome: string): Categoria {
    return this.categorias.find((c) => c.nome === nome) ?? this.categorias[this.categorias.length - 1];
  }

  perguntas = [
    { titulo: 'Como cadastro uma despesa?', conteudo: 'Vá na aba "Nova despesa", preencha a descrição e o valor, escolha uma categoria e clique em "Salvar despesa".' },
    { titulo: 'Como filtro por categoria?', conteudo: 'Na aba "Minhas despesas", clique no botão de filtro e escolha a categoria. Escolha "Todas" para ver tudo.' },
    { titulo: 'O que é a barra de progresso?', conteudo: 'Ela mostra quanto do seu orçamento do mês já foi gasto. Verde: tranquilo. Amarelo: atenção. Vermelho: passou do limite.' },
    { titulo: 'Onde meus dados ficam salvos?', conteudo: 'Ficam salvos no próprio navegador (localStorage). Se fechar a página, os dados continuam lá.' },
  ];
}
