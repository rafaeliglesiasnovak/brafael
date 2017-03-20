var app = angular.module('RafaelShoes');

app.directive('alterarcliente', ["$rootScope", "LoginService", "localStorageService", "$http", "md5",
  function($rootScope, LoginService, localStorageService, $http, md5) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.cliente = {
        CPF_Cli: localStorageService.get('cpf'),
        Nome_Cli: localStorageService.get('nome'),
        Tel_Cel_Cli: localStorageService.get('celular'),
        Tel_Res_Cli: localStorageService.get('telefone'),
        Email_Cli: localStorageService.get('email')
      }

      $scope.account = {};

      $scope.salvar = function(){
        if($scope.account.Senha){
          $scope.account.Senha = md5.createHash($scope.account.Senha);
        }
        $scope.account.Login = $scope.cliente.Email_Cli;
        var body = {
          cliente: $scope.cliente,
          account: $scope.account
        }
        $http.post($rootScope.api + 'v1/cliente/editar', body)
          .success(function(data){
            var usuario = data.response.cliente;

            localStorageService.set('cpf', usuario.CPF_Cli);
            localStorageService.set('nome', usuario.Nome_Cli);
            localStorageService.set('celular', usuario.Tel_Cel_Cli);
            localStorageService.set('telefone', usuario.Tel_Res_Cli);
            localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
            localStorageService.set('sexo', usuario.Sexo_Cli);
            localStorageService.set('email', usuario.Email_Cli);
            localStorageService.set('home', 1);
            localStorageService.set('conta', 9);
            $rootScope.viewFlag = 1;
            $rootScope.isLogado = true;
            $rootScope.viewFlag = 9;
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cliente/alterarcliente.html'
  };
}]);