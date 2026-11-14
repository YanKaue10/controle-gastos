// COMPONENTE 3: PAGINAÇÃO (Pagination)
// Botões "Anterior", números das páginas e "Próxima".
// Uso: <paginacao total-paginas="total" pagina-atual="pagina" ao-mudar="funcao(pagina)"></paginacao>
angular.module('controleGastos').directive('paginacao', function () {
  return {
    restrict: 'E',
    scope: {
      totalPaginas: '<', // quantas páginas existem
      paginaAtual: '<',  // página que está aberta
      aoMudar: '&'       // função chamada ao trocar de página
    },
    template:
      '<div class="flex flex-wrap justify-center items-center gap-1 mt-4" ng-show="totalPaginas > 1">' +
      '  <button ng-click="irPara(paginaAtual - 1)" ng-disabled="paginaAtual === 1"' +
      '    class="px-3 py-1 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100">Anterior</button>' +
      '  <button ng-repeat="numero in paginas()" ng-click="irPara(numero)"' +
      '    class="w-9 py-1 rounded-lg border text-sm"' +
      '    ng-class="numero === paginaAtual ? \'bg-blue-600 text-white border-blue-600\' : \'hover:bg-gray-100\'">{{ numero }}</button>' +
      '  <button ng-click="irPara(paginaAtual + 1)" ng-disabled="paginaAtual === totalPaginas"' +
      '    class="px-3 py-1 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100">Próxima</button>' +
      '</div>',
    link: function (scope) {
      // Cria a lista de números: [1, 2, 3, ...]
      scope.paginas = function () {
        var lista = [];
        for (var i = 1; i <= scope.totalPaginas; i++) {
          lista.push(i);
        }
        return lista;
      };

      // Vai para outra página (se ela existir)
      scope.irPara = function (numero) {
        if (numero >= 1 && numero <= scope.totalPaginas) {
          scope.aoMudar({ pagina: numero });
        }
      };
    }
  };
});
