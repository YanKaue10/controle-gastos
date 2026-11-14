// COMPONENTE 1: ABAS (Tabs)
// Mostra os títulos das abas. Ao clicar em um, aquela aba fica ativa.
// Uso: <abas titulos="listaDeTitulos" ativa="abaAtual"> conteúdo </abas>
angular.module('controleGastos').directive('abas', function () {
  return {
    restrict: 'E',
    transclude: true, // permite colocar o conteúdo das abas dentro da tag
    scope: {
      titulos: '=', // lista com os nomes das abas
      ativa: '='    // número da aba que está aberta
    },
    template:
      '<div>' +
      '  <div class="flex border-b border-gray-200 overflow-x-auto">' +
      '    <button ng-repeat="titulo in titulos" ng-click="selecionar($index)"' +
      '      class="flex-1 px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2"' +
      '      ng-class="ativa === $index ? \'border-blue-600 text-blue-600\' : \'border-transparent text-gray-500 hover:text-gray-700\'">' +
      '      {{ titulo }}' +
      '    </button>' +
      '  </div>' +
      '  <div class="pt-4" ng-transclude></div>' +
      '</div>',
    link: function (scope) {
      // Troca a aba ativa
      scope.selecionar = function (indice) {
        scope.ativa = indice;
      };
    }
  };
});
