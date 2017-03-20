var app = angular.module('RafaelShoes');

app.directive('cadastrarfuncionario', ["$rootScope", "LoginService", "localStorageService", "$http", 
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];
      $scope.Cargo_Func = 'Func';

      $scope.cadastrar = function(){
        var body = {
          account: {
            Login: $scope.Email_Func,
            Senha: $scope.Senha,
            Is_Cli: false,
            Cargo_Func: $scope.Cargo_Func
          },
          funcionario: {
            Nome_Func: $scope.Nome_Func,
            Email_Func: $scope.Email_Func,
            Cargo_Func: $scope.Cargo_Func
          }
        }
        $http.post($rootScope.api + 'v1/funcionario/cadastrar', body)
          .success(function(data){
            if(data.success){
              window.alert("Funcionário cadastrado com sucesso");
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
    templateUrl: 'views/directives/funcionario/cadastrarfuncionario.html'
  };
}]);