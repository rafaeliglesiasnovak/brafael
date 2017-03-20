var app = angular.module('RafaelShoes');

app.directive('buscarcliente', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.buscar = function(){
        $http.get($rootScope.api + 'v1/cliente/get?Email_CLi=' + $scope.Email_Cli).
          success(function(data){
            var clientes = data.response.clientes;
            window.alert("Cliente encontrado:\n" +
                          "Nome: " + clientes[0].Nome_Cli +
                          "\nCPF: " + clientes[0].CPF_Cli +
                          "\nEmail: " + clientes[0].Email_Cli +
                          "\nTel Cel: " + clientes[0].Tel_Cel_Cli +
                          "\nTel Res: " + clientes[0].Tel_Res_Cli);
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cliente/buscarcliente.html'
  };
}]);