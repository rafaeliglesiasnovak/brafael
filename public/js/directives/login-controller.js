var app = angular.module('RafaelShoes');

app.directive('login', ['$rootScope', 'localStorageService', 'md5', 'LoginService', '$http',
  function($rootScope, localStorageService, md5, LoginService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.login = function(){

        if($scope.email == "admin@admin.com" && $scope.senha == "admin"){
          $rootScope.viewFlag = 2;
        } else {
          window.alert("Falha no Login. Atenção ao usuário e senha");
        }   
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/login.html'
  };
}]);