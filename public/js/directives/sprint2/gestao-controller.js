var app = angular.module('RafaelShoes');

app.directive('gestao', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
    },
    templateUrl: 'views/directives/sprint2/gestao.html'
  };
}]);