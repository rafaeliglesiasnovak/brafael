var app = angular.module('RafaelShoes');

app.directive('removerproduto', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.remover = function(){
        $http.get($rootScope.api + 'v1/produto/get?ID_Prod=' + $scope.ID_Prod).
          success(function(data){
            var produtos = data.response.produtos;
            if(window.confirm("Você tem certeza que deseja excluir o produto:\n" +
                          "ID: " + produtos[0].ID_Prod +
                          "\nNome: " + produtos[0].Nome_Prod +
                          "\nDescrição: " + produtos[0].Desc_Prod +
                          "\nFornecedor_Prod: " + produtos[0].Fornecedor_Prod +
                          "\nPreco_Prod: " + produtos[0].Preco_Prod)){
              $http.post($rootScope.api + 'v1/produto/deletar?ID_Prod=' + $scope.ID_Prod).
                success(function(data){
                  window.alert("Produto excluido!");
                  $rootScope.viewFlag = localStorageService.get('home');
                })
            }
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produto/removerproduto.html'
  };
}]);