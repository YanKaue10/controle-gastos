// Filtro que mostra um número no formato de dinheiro brasileiro.
// Exemplo de uso no HTML: {{ 1250 | moeda }}  ->  R$ 1.250,00
angular.module('controleGastos').filter('moeda', function () {
  return function (valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
});
