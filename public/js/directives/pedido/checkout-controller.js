var app = angular.module('RafaelShoes');

app.directive('checkout', ["$rootScope", "LoginService", "$http", "localStorageService",
  function($rootScope, LoginService, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.enderecos = [];

      var body = {
        CPF_Cli: localStorageService.get('cpf'),
        Tipo_Entrega: "Total",
        Forma_Pag: "Boleto"
      }

      var pegarFrete = function(endereco){
        if(endereco.Est_End == "SP" || endereco.Est_End == "RJ" || endereco.Est_End == "ES" || endereco.Est_End == "MG"){
          endereco.Frete_Pedido = 10;
        } else if (endereco.Est_End == "RS" || endereco.Est_End == "SC" || endereco.Est_End == "PR"){
          endereco.Frete_Pedido = 15;
        } else if (endereco.Est_End == "MT" || endereco.Est_End == "GO" || endereco.Est_End == "MS" || endereco.Est_End == "DF"){
          endereco.Frete_Pedido = 18;
        } else if (endereco.Est_End == "AC" || endereco.Est_End == "AM" || endereco.Est_End == "RO" || endereco.Est_End == "RS" || endereco.Est_End == "PA" || endereco.Est_End == "TO" || endereco.Est_End == "AP"){
          endereco.Frete_Pedido = 26;
        } else if (endereco.Est_End == "AL" || endereco.Est_End == "BA" || endereco.Est_End == "CE" || endereco.Est_End == "MA" || endereco.Est_End == "PB" || endereco.Est_End == "PI" || endereco.Est_End == "AP" || endereco.Est_End == "RN" || endereco.Est_End == "SE"){
          endereco.Frete_Pedido = 22;
        }
      }

      $scope.getEnderecos = function(){
        $http.get($rootScope.api + 'v1/endereco/get?CPF_Cli=' + localStorageService.get('cpf'))
          .success(function(data){
            $scope.enderecos = data.response.enderecos;
            for(var i = 0; i < $scope.enderecos.length; i++){
              pegarFrete($scope.enderecos[i]);
            }
          })
      }

      $scope.getEnderecos();

      $scope.selecionaEnd = function(endereco){
        $scope.ID_End = endereco.ID_End;
        $scope.Frete_Pedido = endereco.Frete_Pedido;
      }

      $scope.fechar = function(){
        var Total_Pedido = 0;
        body.ID_End = $scope.ID_End;
        body.Frete_Pedido = $scope.Frete_Pedido;
        body.Total_Pedido = $scope.Total_Pedido;
        if($scope.Tipo_Entrega)
          body.Tipo_Entrega = $scope.Tipo_Entrega;
        if($scope.Forma_Pag)
          body.Forma_Pag = $scope.Forma_Pag;

        $http.get($rootScope.api + 'v1/carrinho/get?CPF_Cli=' + localStorageService.get('cpf'))
          .success(function(data){
            var produtos = data.response.produtos;
            for(var i = 0; i < produtos.length; i++){
              Total_Pedido += produtos[i].Qtd_Prod * produtos[i].Produto.Preco_Prod;
            }
            if(localStorageService.get('cortesia')){
              Total_Pedido = Total_Pedido*0.9;
            }
            body.Total_Pedido = Total_Pedido;
            $http.post($rootScope.api + 'v1/pedido/post', body)
              .success(function(data){
                $rootScope.viewFlag = 25;
              })
          })

        
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/pedido/checkout.html'
  };
}]);