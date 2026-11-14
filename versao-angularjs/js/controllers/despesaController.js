// Controlador principal: liga a tela (HTML) com os serviços.
angular.module('controleGastos').controller('DespesaController', function ($scope, DespesaService, ToastService) {

  // ---------- Dados da tela ----------
  $scope.categorias = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Lazer', 'Educação', 'Outros'];
  $scope.despesas = DespesaService.listar();
  $scope.orcamento = DespesaService.lerOrcamento();
  $scope.novaDespesa = { descricao: '', valor: null, categoria: '' };

  // Abas
  $scope.titulosAbas = ['Nova despesa', 'Minhas despesas', 'Ajuda'];
  $scope.abaAtual = 0;

  // Filtro por categoria
  $scope.opcoesFiltro = ['Todas'].concat($scope.categorias);
  $scope.categoriaFiltro = 'Todas';

  // Paginação
  $scope.itensPorPagina = 5;
  $scope.paginaAtual = 1;

  // ---------- Cadastrar despesa ----------
  $scope.adicionar = function () {
    var d = $scope.novaDespesa;

    // Confere se tudo foi preenchido
    if (!d.descricao || !d.categoria || !d.valor || d.valor <= 0) {
      ToastService.mostrar('Preencha descrição, valor e categoria.', 'erro');
      return;
    }

    $scope.despesas = DespesaService.adicionar({
      descricao: d.descricao,
      valor: Number(d.valor),
      categoria: d.categoria
    });

    $scope.novaDespesa = { descricao: '', valor: null, categoria: '' };
    ToastService.mostrar('Despesa salva com sucesso!', 'sucesso');
  };

  // ---------- Excluir despesa ----------
  $scope.remover = function (despesa) {
    $scope.despesas = DespesaService.remover(despesa.id);
    ToastService.mostrar('Despesa "' + despesa.descricao + '" excluída.', 'info');

    // Se a página ficou vazia, volta uma página
    if ($scope.paginaAtual > $scope.totalPaginas()) {
      $scope.paginaAtual = Math.max(1, $scope.totalPaginas());
    }
  };

  // ---------- Filtrar por categoria ----------
  $scope.filtrar = function (categoria) {
    $scope.categoriaFiltro = categoria;
    $scope.paginaAtual = 1;
    ToastService.mostrar('Mostrando: ' + categoria, 'info');
  };

  // Lista já filtrada pela categoria escolhida
  $scope.despesasFiltradas = function () {
    if ($scope.categoriaFiltro === 'Todas') {
      return $scope.despesas;
    }
    return $scope.despesas.filter(function (d) {
      return d.categoria === $scope.categoriaFiltro;
    });
  };

  // ---------- Paginação ----------
  $scope.totalPaginas = function () {
    return Math.ceil($scope.despesasFiltradas().length / $scope.itensPorPagina);
  };

  // Pega só as despesas da página atual
  $scope.despesasDaPagina = function () {
    var inicio = ($scope.paginaAtual - 1) * $scope.itensPorPagina;
    return $scope.despesasFiltradas().slice(inicio, inicio + $scope.itensPorPagina);
  };

  $scope.mudarPagina = function (pagina) {
    $scope.paginaAtual = pagina;
  };

  // ---------- Totais ----------
  $scope.totalGeral = function () {
    return DespesaService.calcularTotal($scope.despesas);
  };

  $scope.totalFiltrado = function () {
    return DespesaService.calcularTotal($scope.despesasFiltradas());
  };

  // ---------- Orçamento e barra de progresso ----------
  $scope.salvarOrcamento = function () {
    if ($scope.orcamento > 0) {
      DespesaService.salvarOrcamento($scope.orcamento);
    }
  };

  $scope.percentualGasto = function () {
    if (!$scope.orcamento) return 0;
    return ($scope.totalGeral() / $scope.orcamento) * 100;
  };

  // ---------- Perguntas frequentes (acordeão) ----------
  $scope.perguntas = [
    { titulo: 'Como cadastro uma despesa?', conteudo: 'Vá na aba "Nova despesa", preencha a descrição, o valor e a categoria, e clique em "Salvar despesa".' },
    { titulo: 'Como filtro por categoria?', conteudo: 'Na aba "Minhas despesas", clique no botão de filtro e escolha a categoria desejada. Escolha "Todas" para ver tudo.' },
    { titulo: 'O que é a barra de progresso?', conteudo: 'Ela mostra quanto do seu orçamento do mês já foi gasto. Verde: tranquilo. Amarelo: atenção. Vermelho: passou do limite.' },
    { titulo: 'Onde meus dados ficam salvos?', conteudo: 'Ficam salvos no próprio navegador (localStorage). Se fechar a página, os dados continuam lá.' }
  ];
});
