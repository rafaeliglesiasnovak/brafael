var app = angular.module('RafaelShoes');

app.directive('minhaconta', ["$rootScope", "localStorageService", "LoginService", "PerfilService",
    function($rootScope, localStorageService, LoginService, PerfilService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.usuario = {};

      $scope.usuario.cpf = localStorageService.get('cpf');
      if(!$scope.usuario.cpf){
        $rootScope.viewFlag = $rootScope.login;
      }
      else{
        $scope.usuario.nome = localStorageService.get('nome').split(" ")[0];
        $scope.usuario.sobrenome = localStorageService.get('nome').split(" ")[1];
        $scope.usuario.celular = localStorageService.get('celular');
        $scope.usuario.telefone = localStorageService.get('telefone');
        $scope.usuario.nascimento = localStorageService.get('data_nascimento');
        $scope.usuario.sexo = localStorageService.get('sexo');
        $scope.usuario.email = localStorageService.get('email');
      }


      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      $scope.logout = function(){
        LoginService.logout();
      }

      $scope.editar = function(){
        CadastroService.PerfilService($scope.usuario)
          .success(function(data) {
            var usuario = data.data.usuario;

            localStorageService.set('cpf', usuario.CPF_Cli);
            localStorageService.set('nome', usuario.Nome_Cli);
            localStorageService.set('celular', usuario.Tel_Cel_Cli);
            localStorageService.set('telefone', usuario.Tel_Res_Cli);
            localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
            localStorageService.set('sexo', usuario.Sexo_Cli);
            localStorageService.set('email', usuario.Email_Cli);

            // TODO: mostrar feedback de sucesso
          })
          .error(function(err) {
                // TODO: tratar erro
          });
      }
  	},
    templateUrl: 'views/directives/conta/minhaconta.html'
  };
}]);