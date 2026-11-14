// Serviço que cuida das despesas.
// Ele salva e lê os dados do localStorage do navegador.
angular.module('controleGastos').factory('DespesaService', function () {

  var CHAVE_DESPESAS = 'despesas';
  var CHAVE_ORCAMENTO = 'orcamento';

  // Lê a lista de despesas salva (ou uma lista vazia)
  function listar() {
    var dados = localStorage.getItem(CHAVE_DESPESAS);
    return dados ? JSON.parse(dados) : [];
  }

  // Salva a lista inteira no navegador
  function salvarLista(lista) {
    localStorage.setItem(CHAVE_DESPESAS, JSON.stringify(lista));
  }

  // Adiciona uma nova despesa
  function adicionar(despesa) {
    var lista = listar();
    despesa.id = Date.now(); // número único para cada despesa
    despesa.data = new Date().toISOString();
    lista.unshift(despesa); // coloca no começo da lista
    salvarLista(lista);
    return lista;
  }

  // Remove uma despesa pelo id
  function remover(id) {
    var lista = listar().filter(function (d) {
      return d.id !== id;
    });
    salvarLista(lista);
    return lista;
  }

  // Soma o valor de todas as despesas da lista
  function calcularTotal(lista) {
    var total = 0;
    lista.forEach(function (d) {
      total += d.valor;
    });
    return total;
  }

  // Orçamento do mês (limite de gastos)
  function lerOrcamento() {
    return Number(localStorage.getItem(CHAVE_ORCAMENTO)) || 1000;
  }

  function salvarOrcamento(valor) {
    localStorage.setItem(CHAVE_ORCAMENTO, valor);
  }

  return {
    listar: listar,
    adicionar: adicionar,
    remover: remover,
    calcularTotal: calcularTotal,
    lerOrcamento: lerOrcamento,
    salvarOrcamento: salvarOrcamento
  };
});
