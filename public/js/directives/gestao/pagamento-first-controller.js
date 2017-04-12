var app = angular.module('RafaelShoes');

app.directive('pagamentoFirst', ["$rootScope", "$http",
    function($rootScope, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      // $http.get($rootScope.api + 'v1/gestao/pagamento?dat_ini=' + $scope.dataInicial + '&dat_fin=' + $scope.dataFInal)
      $http.get($rootScope.api + 'v1/gestao/pagamento?dat_ini=01012017&dat_fin=15042017').
        success(function(data){
          console.log(data.data.x);

          $scope.labels = data.data.x;
          $scope.data = [
            data.data.y
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };
          $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
          $scope.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
                }
              ]
            }
          }
        });

      
    },
    templateUrl: 'views/directives/pagamento/pagamentofirst.html'
  };
}]);