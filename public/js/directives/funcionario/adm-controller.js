var app = angular.module('RafaelShoes');

app.directive('adm', ["$rootScope", "LoginService", "localStorageService", "$http",
 function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.cortesia = localStorageService.get('cortesia');

      $scope.ifTrue = function(){
        if($scope.cortesia){
          return true;
        } else {
          return false;
        }
      }

      $scope.ifFalse = function(){
        if($scope.cortesia){
          return false;
        } else {
          return true;
        }
      }

      $scope.logout = function(){
        LoginService.logout();
      }

      $scope.updateCortesia = function(){
        $http.post($rootScope.api + 'v1/cortesia/post', {Cortesia: $scope.cortesia})
          .success(function(data){
            localStorageService.set('cortesia', data.cortesia);
          });
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/funcionario/adm.html'
  };
}]);