angular.module('RafaelShoes', [
    'satellizer',
    'LocalStorageModule',
    'angular-md5',
    ])

.factory('sessionInjector', [function() {  
    var sessionInjector = {
        request: function(config) {

            config.headers['x-token-conta'] = localStorage.tokenConta;
            
            return config;
        }
    };
    return sessionInjector;
}])

.config(['$httpProvider', '$authProvider', function($httpProvider, $authProvider) {  
    $httpProvider.interceptors.push('sessionInjector');
    $authProvider.loginUrl = '/v1/login'; //end point do login
}])

.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
})

.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
})

.controller("appController", ["$rootScope", "CarrinhoService", "localStorageService", "$http",  function($rootScope, CarinhoService, localStorageService, $http){
	var appCtrl = this;

	$rootScope.api = "http://localhost:3000/"

    if(localStorageService.get('home')){
        $rootScope.viewFlag = localStorageService.get('home');
    } else {
        $rootScope.viewFlag = 1;
    }

    if(localStorageService.get('logado')){
        $rootScope.isLogado = true;
    } else {
        $rootScope.isLogado = false;
    }

    $http.get($rootScope.api + 'v1/cortesia/get')
        .success(function(data){
            localStorageService.set('cortesia', data.cortesia);
        });

    $rootScope.carrinhoProduto = [];

    // constantes das paginas
    $rootScope.home = 1;
    $rootScope.detalhe = 2;
    $rootScope.login = 3;
    $rootScope.cadastro = 4;
    $rootScope.produtos = 5;
    $rootScope.contato = 6;
    $rootScope.carrinho = 7;
    $rootScope.esquecisenha = 8;
    $rootScope.minhaconta = 9;
    $rootScope.sobrerafael = 10;
    $rootScope.adm = 11;
    $rootScope.cadastrarproduto = 12;
    $rootScope.buscarproduto = 13;
    $rootScope.removerproduto = 14;
    $rootScope.alterarproduto = 15;
    $rootScope.cadastrarfuncionario = 16;
    $rootScope.buscarfuncionario = 17;
    $rootScope.removerfuncionario = 18;
    $rootScope.alterarfuncionario = 19;
    $rootScope.buscarcliente = 20;
    $rootScope.removercliente = 21;
    $rootScope.supervisor = 22;
    $rootScope.funcionario = 23;
    $rootScope.alterarcliente = 24;
    $rootScope.meuspedidos = 25;
    $rootScope.devolucao = 26;
    $rootScope.checkout = 27;
    $rootScope.cadastrarendereco = 28;
    $rootScope.alterarendereco = 29;
    $rootScope.removerendereco = 30;
    $rootScope.enderecounico = 31;


    $rootScope.addProduto = function(produto){
        CarrinhoService.addProduto(produto);
    }

    appCtrl.goTo = function(id){
        $rootScope.viewFlag = id;
    }

    appCtrl.goToConta = function(){
        if($rootScope.isLogado){
            $rootScope.viewFlag = localStorageService.get('conta');
        } else {
            $rootScope.viewFlag = 3;
        }
    }

    appCtrl.goToCategoria = function(idProduto){
        // Salvar produto no service
        $rootScope.viewFlag = $rootScope.produtos;
    }

}])
;