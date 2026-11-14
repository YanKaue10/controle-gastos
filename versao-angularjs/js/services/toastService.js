// Serviço das notificações (toast).
// Guarda as mensagens que aparecem no canto da tela e some com elas depois de 3 segundos.
angular.module('controleGastos').factory('ToastService', function ($timeout) {

  var mensagens = [];

  // Mostra uma mensagem. Tipos: 'sucesso', 'erro' ou 'info'
  function mostrar(texto, tipo) {
    var toast = { texto: texto, tipo: tipo || 'info' };
    mensagens.push(toast);

    // Some sozinho depois de 3 segundos
    $timeout(function () {
      fechar(toast);
    }, 3000);
  }

  // Fecha (remove) uma mensagem
  function fechar(toast) {
    var posicao = mensagens.indexOf(toast);
    if (posicao !== -1) {
      mensagens.splice(posicao, 1);
    }
  }

  return {
    mensagens: mensagens,
    mostrar: mostrar,
    fechar: fechar
  };
});
