var app = angular.module('RafaelShoes');

app.directive('home', ["$rootScope", "localStorageService", "ProdutoService", "$http",
    function($rootScope, localStorageService, ProdutoService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.produtos1 = [];
      $scope.produtos2 = [];
      $scope.produtos3 = [];

      $http.get($rootScope.api + 'v1/produto/get').success(function(data){
        var produtos = data.response.produtos;
        if(produtos.length > 9){
          var produtosCont = 9;
        } else {
          var produtosCont = produtos.length;
        }
        for(var i = 0; i < produtosCont; i++){
          if(i < 3){
            $scope.produtos1.push(produtos[i]);
          } else if ( i < 6){
            $scope.produtos2.push(produtos[i]);
          } else {
            $scope.produtos3.push(produtos[i]);
          }
        }

      });
      
      $scope.goToDetalhe = function(){
        // TODO: passar produto para service
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/home.html'
  };
}]);