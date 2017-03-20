var app = angular.module('RafaelShoes');

app.directive('removercliente', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.remover = function(){
        $http.get($rootScope.api + 'v1/cliente/get?CPF_Cli=' + $scope.CPF_Cli).
          success(function(data){
            var clientes = data.response.clientes;
            if(window.confirm("Você tem certeza que deseja excluir o cliente:\n" +
                          "Nome: " + clientes[0].Nome_Cli +
                          "\nCPF: " + clientes[0].CPF_Cli +
                          "\nEmail: " + clientes[0].Email_Cli +
                          "\nTel Cel: " + clientes[0].Tel_Cel_Cli +
                          "\nTel Res: " + clientes[0].Tel_Res_Cli)){
              $http.delete($rootScope.api + 'v1/cliente/deletar?CPF_Cli=' + $scope.CPF_Cli).
                success(function(data){
                  window.alert("Cliente excluido!");
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
    templateUrl: 'views/directives/cliente/removercliente.html'
  };
}]);