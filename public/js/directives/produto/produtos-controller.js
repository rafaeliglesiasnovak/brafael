var app = angular.module('RafaelShoes');

app.directive('produtos', ["$rootScope", "$http", function($rootScope, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.produtos1 = [];
      $scope.produtos2 = [];
      $scope.produtos3 = [];
      $scope.produtos4 = [];
      $scope.produtos5 = [];
      $scope.produtos6 = [];

      $http.get($rootScope.api + 'v1/produto/get').success(function(data){
        var produtos = data.response.produtos;
        if(produtos.length > 18){
          var produtosCont = 18;
        } else {
          var produtosCont = produtos.length;
        }
        for(var i = 0; i < produtosCont; i++){
          if(i < 3){
            $scope.produtos1.push(produtos[i]);
          } else if ( i < 6){
            $scope.produtos2.push(produtos[i]);
          } else if ( i < 9){
            $scope.produtos3.push(produtos[i]);
          } else if ( i < 12){
            $scope.produtos4.push(produtos[i]);
          } else if ( i < 15){
            $scope.produtos5.push(produtos[i]);
          } else if ( i < 18){
            $scope.produtos6.push(produtos[i]);
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
    templateUrl: 'views/directives/produto/produtos.html'
  };
}]);