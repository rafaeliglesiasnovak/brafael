var app = angular.module('RafaelShoes');

app.directive('meuspedidos', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;
      
      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $http.get($rootScope.api + 'v1/pedido/get?CPF_Cli=' + localStorageService.get('cpf'))
        .success(function(data){
          $scope.pedidos = data.response.pedidos;
        })

      $scope.logout = function(){
        LoginService.logout();
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/pedido/meuspedidos.html'
  };
}]);