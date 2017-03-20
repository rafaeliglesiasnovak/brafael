var app = angular.module('RafaelShoes');

app.directive('carrinho', ["$rootScope", "CarrinhoService", "LoginService", "$http", "localStorageService",
  function($rootScope, CarrinhoService, LoginService, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.reset = function(){
        $scope.total = 0;

        $scope.cortesia = localStorageService.get('cortesia');

        if(localStorageService.get('logado')){
          $http.get($rootScope.api + 'v1/carrinho/get?CPF_Cli=' + localStorageService.get('cpf'))
            .success(function(data){
              $scope.produtos = data.response.produtos;
              for(var i = 0; i < $scope.produtos.length; i++){
                $scope.total += $scope.produtos[i].Qtd_Prod * $scope.produtos[i].Produto.Preco_Prod;
              }
            })
        } else {
          $scope.produtos = $rootScope.carrinhoProduto;
          for(var i = 0; i < $scope.produtos.length; i++){
            $scope.total += $scope.produtos[i].Qtd_Prod * $scope.produtos[i].Produto.Preco_Prod;
          }
        }
      }

      $scope.reset();

      $scope.limparCarrinho = function(){
        if(localStorageService.get('logado')){
          $http.post($rootScope.api + 'v1/carrinho/limpar', {CPF_Cli: localStorageService.get('cpf')})
            .success(function(data){
              $scope.reset();
            })
        } else {
          $rootScope.carrinhoProduto = [];
          $scope.reset();
        }
      }

      $scope.cadastrar = function(){
        // TODO: fazer carrinho
        $rootScope.viewFlag = 1;
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/carrinho/carrinho.html'
  };
}]);