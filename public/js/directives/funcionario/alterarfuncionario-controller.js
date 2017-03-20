var app = angular.module('RafaelShoes');

app.directive('alterarfuncionario', ["$rootScope", "LoginService", "localStorageService", "$http", 
  function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.editar = function(){
        var body = {account:{}, funcionario: {ID_Func: $scope.ID_Func}};
        if($scope.Email_Func){
          body.account.Login = $scope.Email_Func;
          body.funcionario.Email_Func = $scope.Email_Func;
        }
        if($scope.Cargo_Func){
          body.funcionario.Cargo_Func = $scope.Cargo_Func;
          body.account.Cargo_Func = $scope.Cargo_Func;
        }
        if($scope.Nome_Func){
          body.funcionario.Nome_Func= $scope.Nome_Func;
        }
        $http.post($rootScope.api + 'v1/funcionario/editar', body)
          .success(function(data){
            if(data.success){
              window.alert("Funcionário editado com sucesso");
              $rootScope.viewFlag = localStorageService.get('home');
            } else {
              window.alert("Email já cadastrado");
            }
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/funcionario/alterarfuncionario.html'
  };
}]);