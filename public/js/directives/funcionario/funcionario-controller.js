var app = angular.module('RafaelShoes');

app.directive('funcionario', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      var reset = function(){
        $http.get($rootScope.api + 'v1/pedido/get?ID_Func=' + localStorageService.get('id'))
          .success(function(data){
            $scope.pedidos = data.response.pedidos;
          })
      }

      reset();

      $scope.modificarStatus = function(ID, Status){
        $http.post($rootScope.api + 'v1/pedido/editar', {ID_Pedido: ID, Status_Pedido: Status})
          .success(function(data){
            reset();
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/funcionario/funcionario.html'
  };
}]);