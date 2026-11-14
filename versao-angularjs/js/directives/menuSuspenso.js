// COMPONENTE 2: MENU SUSPENSO (Dropdown)
// Um botão que abre uma lista de opções. Fecha ao escolher ou ao clicar fora.
// Uso: <menu-suspenso rotulo="Texto do botão" opcoes="lista" ao-escolher="funcao(opcao)"></menu-suspenso>
angular.module('controleGastos').directive('menuSuspenso', function ($document) {
  return {
    restrict: 'E',
    scope: {
      rotulo: '@',     // texto do botão
      opcoes: '=',     // lista de opções
      aoEscolher: '&'  // função chamada quando uma opção é escolhida
    },
    template:
      '<div class="relative inline-block w-full sm:w-56">' +
      '  <button type="button" ng-click="alternar()"' +
      '    class="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">' +
      '    <span>{{ rotulo }}</span>' +
      '    <span class="text-gray-400">&#9662;</span>' +
      '  </button>' +
      '  <ul ng-show="aberto"' +
      '    class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">' +
      '    <li ng-repeat="opcao in opcoes">' +
      '      <button type="button" ng-click="escolher(opcao)"' +
      '        class="w-full text-left px-4 py-2 text-sm hover:bg-blue-50">{{ opcao }}</button>' +
      '    </li>' +
      '  </ul>' +
      '</div>',
    link: function (scope, elemento) {
      scope.aberto = false;

      // Abre ou fecha o menu
      scope.alternar = function () {
        scope.aberto = !scope.aberto;
      };

      // Escolhe uma opção, avisa quem usa o menu e fecha
      scope.escolher = function (opcao) {
        scope.aoEscolher({ opcao: opcao });
        scope.aberto = false;
      };

      // Fecha o menu quando clicar fora dele
      function cliqueFora(evento) {
        if (!elemento[0].contains(evento.target)) {
          scope.$apply(function () {
            scope.aberto = false;
          });
        }
      }
      $document.on('click', cliqueFora);

      // Remove o "ouvinte" quando o componente sai da tela
      scope.$on('$destroy', function () {
        $document.off('click', cliqueFora);
      });
    }
  };
});
