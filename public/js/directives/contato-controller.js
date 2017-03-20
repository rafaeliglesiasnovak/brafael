var app = angular.module('RafaelShoes');

app.directive('contato', ["$rootScope", "$http", function($rootScope, $http) { 
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.Nome = 'Nome';
      $scope.Email = 'Email';
      $scope.Mensagem = 'Mensagem';

      $scope.enviar = function(){
        if($scope.Nome == 'Nome'){
          $scope.myForm.Nome.$setValidity("Nome", false);
        } else if ($scope.Email == 'Email'){
          $scope.myForm.Email.$setValidity("Email", false);
        }else if ($scope.Mensagem == 'Mensagem') {
          $scope.myForm.Mensagem.$setValidity("Mensagem", false);
        }else {
          var body = {
            Nome: $scope.Nome,
            Email: $scope.Email,
            Mensagem: $scope.Mensagem
          }

          $http.post($rootScope.api + 'v1/contato/send', body)
            .success(function(data){
              window.alert("Mensagem enviada!");
              $rootScope.viewFlag = 1;
            })
        }
      }

      $scope.blank = function(texto){
        if(texto == 'Nome' && $scope.Nome == 'Nome'){
          $scope.Nome = '';
        } else if(texto == 'Email' && $scope.Email == 'Email'){
          $scope.Email = '';
        } else if(texto == 'Mensagem' && $scope.Mensagem == 'Mensagem'){
          $scope.Mensagem = '';
        }
      }

      $scope.return = function(texto){
        if(texto == 'Nome' && $scope.Nome == ''){
          $scope.Nome = texto;
        } else if(texto == 'Email' && $scope.Email == ''){
          $scope.Email = texto;
        } else if(texto == 'Mensagem' && $scope.Mensagem == ''){
          $scope.Mensagem = texto;
        }
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/contato.html'
  };
}]);