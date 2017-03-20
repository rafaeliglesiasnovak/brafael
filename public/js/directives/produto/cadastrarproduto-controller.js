var app = angular.module('RafaelShoes');

app.directive('cadastrarproduto', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.tamanhos = [{}];

      $scope.adicionarTamanho = function(){
        $scope.tamanhos.push({});
      }

      $scope.removerTamanho = function(tamanho){
        for(var i = 0; i < $scope.tamanhos.length; i++){
          if($scope.tamanhos[i] === tamanho){
            $scope.tamanhos.splice(i, 1);
          }
        }
      }

      $scope.cadastrar = function(){
        var fd = new FormData();
        fd.append('Nome_Prod', $scope.Nome_Prod);
        fd.append('Desc_Prod', $scope.Desc_Prod);
        fd.append('Fornecedor_Prod', $scope.Fornecedor_Prod);
        fd.append('Peso_Prod', $scope.Peso_Prod);
        fd.append('Larg_Prod', $scope.Larg_Prod);
        fd.append('Comp_Prod', $scope.Comp_Prod);
        fd.append('Alt_Prod', $scope.Alt_Prod);
        fd.append('Preco_Prod', $scope.Preco_Prod);
        fd.append('Cor_Prod', $scope.Cor_Prod);
        fd.append('Nome_Prod', $scope.Nome_Prod);
        fd.append('tamanhos', $scope.tamanhos);
        fd.append('produto', $scope.produto);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", $rootScope.api + 'v1/produto/cadastrar');
        xhr.send(fd);

        // $http.post($rootScope.api + 'v1/produto/cadastrar', fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined} })
        //   .success(function(data){
        //     window.alert("Produto cadastrado com sucesso!");
        //     $rootScope.viewFlag = localStorageService.get('home');
        //   })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produto/cadastrarproduto.html'
  };
}]);