export interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
}

export interface Categoria {
  nome: string;
  cor: string;
}

export const CATEGORIAS: Categoria[] = [
  { nome: 'Alimentação', cor: 'bg-orange-400/20 text-orange-300' },
  { nome: 'Transporte', cor: 'bg-sky-400/20 text-sky-300' },
  { nome: 'Moradia', cor: 'bg-violet-400/20 text-violet-300' },
  { nome: 'Saúde', cor: 'bg-rose-400/20 text-rose-300' },
  { nome: 'Lazer', cor: 'bg-pink-400/20 text-pink-300' },
  { nome: 'Educação', cor: 'bg-emerald-400/20 text-emerald-300' },
  { nome: 'Outros', cor: 'bg-slate-400/20 text-slate-300' },
];
