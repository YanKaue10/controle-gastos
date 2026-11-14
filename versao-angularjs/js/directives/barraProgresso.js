// COMPONENTE 4: BARRA DE PROGRESSO (Progress Bar)
// Mostra quanto do orçamento já foi gasto (de 0 a 100%).
// Uso: <barra-progresso valor="numeroDe0a100"></barra-progresso>
angular.module('controleGastos').directive('barraProgresso', function () {
  return {
    restrict: 'E',
    scope: {
      valor: '<' // porcentagem (0 a 100)
    },
    template:
      '<div>' +
      '  <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">' +
      '    <div class="h-full rounded-full transition-all duration-500"' +
      '      ng-class="cor()" ng-style="{ width: largura() + \'%\' }"></div>' +
      '  </div>' +
      '  <p class="text-right text-xs text-gray-500 mt-1">{{ valor | number:0 }}% do orçamento</p>' +
      '</div>',
    link: function (scope) {
      // A barra nunca passa de 100% de largura
      scope.largura = function () {
        return Math.min(scope.valor || 0, 100);
      };

      // Verde = tranquilo, amarelo = atenção, vermelho = estourou
      scope.cor = function () {
        if (scope.valor >= 100) return 'bg-red-500';
        if (scope.valor >= 70) return 'bg-yellow-400';
        return 'bg-green-500';
      };
    }
  };
});
