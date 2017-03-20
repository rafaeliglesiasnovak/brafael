var app = angular.module('RafaelShoes');

app.directive('supervisor', ["$rootScope", "LoginService","localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $http.get($rootScope.api + 'v1/pedido/getSup')
        .success(function(data){
          $scope.pedidos = data.response.pedidos;
        });

      $scope.enviarAlerta = function(pedido){
        var body = {
          Nome_Sup: localStorageService.get('nome'),
          Email_Sup: localStorageService.get('email'),
          ID_Pedido: pedido.ID_Pedido
        }
        $http.get($rootScope.api + 'v1/funcionario/get?ID_Func=' + pedido.ID_Func)
          .success(function(data){
            body.Email_Func = data.response.funcionarios[0].Email_Func;
            $http.post($rootScope.api + 'v1/alerta/send', body)
              .success(function(data){
                window.alert("Alerta enviado com sucesso!");
              });
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/funcionario/supervisor.html'
  };
}]);