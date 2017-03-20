var app = angular.module('RafaelShoes');

app.directive('alterarendereco', ["$rootScope", "$http", "localStorageService", "LoginService", function($rootScope, $http, localStorageService, LoginService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;


      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.enderecos = [];

      $scope.pegaEndereco = function(){
        $http.get($rootScope.api + 'v1/endereco/get?CPF_Cli=' + localStorageService.get('cpf'))
          .success(function(data){
            $scope.enderecos = data.response.enderecos;
          })
      }

      $scope.pegaEndereco();

      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id, index){
        $rootScope.endereco = $scope.enderecos[index];
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/endereco/alterarendereco.html'
  };
}]);