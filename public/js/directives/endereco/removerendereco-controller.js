var app = angular.module('RafaelShoes');

app.directive('removerendereco', ["$rootScope", "$http", "localStorageService", "LoginService", 
    function($rootScope, $http, localStorageService, LoginService) {
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

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.pegaEndereco();

      $scope.remover = function(ID_End){
        $http.post($rootScope.api + 'v1/endereco/deletar?ID_End=' + ID_End)
          .success(function(data){
            for(var i = 0; i <= $scope.enderecos.length; i++){
              if($scope.enderecos[i].ID_End == ID_End){
                $scope.enderecos.splice(i, 1);
              }
            }
          });
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/endereco/removerendereco.html'
  };
}]);