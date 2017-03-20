var app = angular.module('RafaelShoes');

app.directive('esquecisenha', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.cadastrar = function(){
        // TODO: fazer esquecisenha
        $rootScope.viewFlag = 1;
      }

      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/conta/esquecisenha.html'
  };
}]);