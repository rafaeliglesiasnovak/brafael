var app = angular.module('RafaelShoes');

app.directive('orcamentoFirst', ["$rootScope", "$http",
    function($rootScope, $http) {
  return {
    restrict: 'E',
    link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.dataInicial = new Date();
      $scope.dataFinal = new Date();

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      $scope.gerarGrafico = function(){
        var day = $scope.dataInicial.getDate();
        var month = ($scope.dataInicial.getMonth() + 1);

        if(month < 10){
          month = "0" + month;
        }

        if(day < 10){
          day = "0" + day;
        }

        var dataInicial = day + month + $scope.dataInicial.getFullYear();

        day = $scope.dataFinal.getDate();
        month = ($scope.dataFinal.getMonth() + 1);

        if(month < 10){
          month = "0" + month;
        }

        if(day < 10){
          day = "0" + day;
        }

        var dataFinal = day + month + $scope.dataFinal.getFullYear();

        $http.get($rootScope.api + 'v1/gestao/servico?dat_ini=' + dataInicial + '&dat_fin=' + dataFinal)
          .success(function(data){

            var x = [];

            for(var i = 0; i < data.data.x.length; i++){
              x.push((new Date(data.data.x[i])).toDateString());
            }

            $scope.labels = x;
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

            window.alert("Sua requisição demorou " + data.timestamp + " milissegundos e custou " + (data.timestamp*0.005) + " reais");
      }
      
    },
    templateUrl: 'views/directives/orcamento/orcamentofirst.html'
  };
}]);