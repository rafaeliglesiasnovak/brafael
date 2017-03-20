var app = angular.module('RafaelShoes');

app.directive('buscarfuncionario', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.buscar = function(){
        $http.get($rootScope.api + 'v1/funcionario/get?Email_Func=' + $scope.Email_Func)
          .success(function(data){
            var funcionarios = data.response.funcionarios;
            window.alert("Funcionário encontrado:\n" +
                          "Nome: " + funcionarios[0].Nome_Func +
                          "\nID_Func: " + funcionarios[0].ID_Func +
                          "\nEmail: " + funcionarios[0].Email_Func +
                          "\nCargo: " + funcionarios[0].Cargo_Func);
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/funcionario/buscarfuncionario.html'
  };
}]);