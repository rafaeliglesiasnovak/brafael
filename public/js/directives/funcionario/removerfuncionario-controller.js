var app = angular.module('RafaelShoes');

app.directive('removerfuncionario', ["$rootScope", "LoginService", "localStorageService", "$http", 
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.remover = function(){$http.get(
        $rootScope.api + 'v1/funcionario/get?ID_Func=' + $scope.ID_Func)
          .success(function(data){
            var funcionarios = data.response.funcionarios;
            if(window.confirm("Você tem certeza que deseja excluir o funcionário:\n" +
                          "Nome: " + funcionarios[0].Nome_Func +
                          "\nID_Func: " + funcionarios[0].ID_Func +
                          "\nEmail: " + funcionarios[0].Email_Func +
                          "\nCargo: " + funcionarios[0].Cargo_Func)){
              $http.delete($rootScope.api + 'v1/funcionario/deletar?ID_Func=' + $scope.ID_Func).
                success(function(data){
                  window.alert("Funcionario excluido!");
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
    templateUrl: 'views/directives/funcionario/removerfuncionario.html'
  };
}]);