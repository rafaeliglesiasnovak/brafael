var app = angular.module('RafaelShoes');

app.directive('alterarproduto', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.produto = $rootScope.produto;

      $scope.editar = function(){
        $http.post($rootScope.api + 'v1/produto/editar', $scope.produto)
          .success(function(data){
            window.alert("Produto editado com sucesso");
        $rootScope.viewFlag = localStorageService.get('home');
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produto/alterarproduto.html'
  };
}]);