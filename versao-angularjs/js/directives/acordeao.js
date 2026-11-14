// COMPONENTE 5: ACORDEÃO (Accordion)
// Lista de perguntas. Ao clicar em uma, a resposta abre. Só uma fica aberta por vez.
// Uso: <acordeao itens="listaDePerguntas"></acordeao>
// Cada item da lista tem: { titulo: '...', conteudo: '...' }
angular.module('controleGastos').directive('acordeao', function () {
  return {
    restrict: 'E',
    scope: {
      itens: '<'
    },
    template:
      '<div class="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">' +
      '  <div ng-repeat="item in itens">' +
      '    <button ng-click="alternar($index)"' +
      '      class="w-full flex justify-between items-center text-left px-4 py-3 font-medium hover:bg-gray-50">' +
      '      <span>{{ item.titulo }}</span>' +
      '      <span class="text-xl text-blue-600">{{ aberto === $index ? \'−\' : \'+\' }}</span>' +
      '    </button>' +
      '    <div class="overflow-hidden transition-all duration-300"' +
      '      ng-style="{ \'max-height\': aberto === $index ? \'200px\' : \'0px\' }">' +
      '      <p class="px-4 pb-4 text-sm text-gray-600">{{ item.conteudo }}</p>' +
      '    </div>' +
      '  </div>' +
      '</div>',
    link: function (scope) {
      scope.aberto = null; // nenhum item aberto no começo

      // Abre o item clicado. Se já estava aberto, fecha.
      scope.alternar = function (indice) {
        scope.aberto = scope.aberto === indice ? null : indice;
      };
    }
  };
});
