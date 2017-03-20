var app = angular.module('RafaelShoes');

app.directive('itemcarrinho', ["$rootScope", "ProdutoService", "localStorageService", "$http", function($rootScope, ProdutoService, localStorageService, $http) {
  return {
  	restrict: 'E',
    scope: {
    	produto: "=",
    	salvar: '=',
    	deletar: '=',
    	reset: '='
    },
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.salvar = function(){
        var body = {
          CPF_Cli: localStorageService.get('cpf'),
          ID_Prod: $scope.produto.ID_Prod,
          Qtd_Prod: $scope.produto.Qtd_Prod,
          Tamanho_Prod: $scope.produto.Tamanho_Prod
        }
        $http.post($rootScope.api + 'v1/carrinho/edititem', body)
          .success(function(data){
            $scope.reset();
          });
      }

      $scope.deletar = function(){
        if(localStorageService.get('logado')){
          var body = {
            CPF_Cli: localStorageService.get('cpf'),
            ID_Prod: $scope.produto.ID_Prod
          }
          $http.post($rootScope.api + 'v1/carrinho/delitem', body)
            .success(function(data){
              $scope.reset();
            });
        } else {
          for(var i = 0; i < $rootScope.carrinhoProduto.length; i++){
            if($rootScope.carrinhoProduto[i].ID_Prod == $scope.produto.ID_Prod && $rootScope.carrinhoProduto[i].Tamanho_Prod == $scope.produto.Tamanho_Prod){
              $rootScope.carrinhoProduto.splice(i, 1);
            }
          }
          $scope.reset();
        }
      }
      // TODO: retirar do carrinho
  	},
    templateUrl: 'views/directives/carrinho/item-carrinho.html'
  };
}]);