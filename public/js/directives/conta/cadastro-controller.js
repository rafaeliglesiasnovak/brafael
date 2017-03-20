var app = angular.module('RafaelShoes');

app.directive('cadastro', ["$rootScope", "LoginService", "CadastroService", "md5", "$http", "localStorageService",
    function($rootScope, LoginService, CadastroService, md5, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.usuario = {};

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.cadastrar = function(){
        CadastroService.cadastrar($scope.usuario)
          .success(function(data) {
            var credentials = {};

            login();
          })
          .error(function(err) {
                // TODO: tratar erro
          });
      }

      var login = function(){
        $http.post($rootScope.api + 'v1/login', {Login: $scope.usuario.email, Senha: md5.createHash($scope.usuario.senha)})
          .success(function(data){
            var usuario = data.usuario;
            if(usuario.Account.Is_Cli){
              localStorageService.set('cpf', usuario.CPF_Cli);
              localStorageService.set('nome', usuario.Nome_Cli);
              localStorageService.set('celular', usuario.Tel_Cel_Cli);
              localStorageService.set('telefone', usuario.Tel_Res_Cli);
              localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
              localStorageService.set('sexo', usuario.Sexo_Cli);
              localStorageService.set('email', usuario.Email_Cli);
              localStorageService.set('home', 1);
              localStorageService.set('conta', 9);
              localStorageService.set('logado', true);
              $rootScope.viewFlag = 1;
              $rootScope.isLogado = true;

            } else {
              if(usuario.Cargo_Func == 'Func'){
                localStorageService.set('home', 23);
                localStorageService.set('conta', 23);
                localStorageService.set('nome', usuario.Nome_Func);
                localStorageService.set('email', usuario.Email_Func);
                localStorageService.set('logado', true);
                $rootScope.viewFlag = 23;
                $rootScope.isLogado = true;

              } else if (usuario.Cargo_Func == 'Adm') {
                localStorageService.set('home', 11);
              localStorageService.set('conta', 11);
                localStorageService.set('nome', usuario.Nome_Func);
                localStorageService.set('email', usuario.Email_Func);
                localStorageService.set('logado', true);
                $rootScope.viewFlag = 11;
                $rootScope.isLogado = true;

              } else if (usuario.Cargo_Func == 'Sup'){
                localStorageService.set('home', 22);
              localStorageService.set('conta', 22);
                localStorageService.set('nome', usuario.Nome_Func);
                localStorageService.set('email', usuario.Email_Func);
                localStorageService.set('logado', true);
                $rootScope.viewFlag = 22;
                $rootScope.isLogado = true;

              }
            }
          });
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/conta/cadastro.html'
  };
}]);