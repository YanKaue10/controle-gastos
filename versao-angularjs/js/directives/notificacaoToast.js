// COMPONENTE 6: NOTIFICAÇÃO TOAST
// Mostra as mensagens do ToastService no canto da tela.
// Uso: <notificacao-toast></notificacao-toast>  (coloque uma vez na página)
angular.module('controleGastos').directive('notificacaoToast', function (ToastService) {
  return {
    restrict: 'E',
    scope: {},
    template:
      '<div class="fixed top-4 left-4 right-4 sm:left-auto sm:w-80 z-50 space-y-2">' +
      '  <div ng-repeat="toast in mensagens"' +
      '    class="flex justify-between items-start gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm"' +
      '    ng-class="{ \'bg-green-600\': toast.tipo === \'sucesso\', \'bg-red-600\': toast.tipo === \'erro\', \'bg-blue-600\': toast.tipo === \'info\' }">' +
      '    <span>{{ toast.texto }}</span>' +
      '    <button ng-click="fechar(toast)" class="font-bold opacity-80 hover:opacity-100">&times;</button>' +
      '  </div>' +
      '</div>',
    link: function (scope) {
      scope.mensagens = ToastService.mensagens;
      scope.fechar = ToastService.fechar;
    }
  };
});
