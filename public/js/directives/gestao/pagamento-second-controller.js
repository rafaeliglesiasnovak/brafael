var app = angular.module('RafaelShoes');

app.directive('pagamentoSecond', ["$rootScope", "$http",
    function($rootScope, $http) {
  return {
    restrict: 'E',
    link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.date = new Date();

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      $scope.gerarGrafico = function(){
        var day = $scope.date.getDate();
        var month = ($scope.date.getMonth() + 1);

        if(month < 10){
          month = "0" + month;
        }

        if(day < 10){
          day = "0" + day;
        }

        var date = day + month + $scope.date.getFullYear();

        $http.get($rootScope.api + 'v1/gestao/pagamento/pendente?data=' + date)
          .success(function(data){

            $scope.labels = data.data.x;
            $scope.data = [
              data.data.y
            ];

            window.alert("Sua requisição demorou " + data.timestamp + " milissegundos e custou " + (data.timestamp*0.005) + " reais");
          });
      }
      
    },
    templateUrl: 'views/directives/pagamento/pagamentosecond.html'
  };
}]);