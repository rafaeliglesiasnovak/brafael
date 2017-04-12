angular.module('RafaelShoes', [
    'satellizer',
    'LocalStorageModule',
    'angular-md5',
    'chart.js'
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

	// $rootScope.api = "//localhost3000/"
    $rootScope.api = "//brafael.herokuapp.com/"

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
    $rootScope.gestao = 2;

    $rootScope.pagamentoFirst = 3;
    $rootScope.orcamentoFirst = 4;
    $rootScope.afiliacaoFirst = 5;
    $rootScope.pagamentoSecond = 6;
    $rootScope.orcamentoSecond = 7;
    $rootScope.afiliacaoSecond = 8;

    $rootScope.login = 9;


    $rootScope.addProduto = function(produto){
        CarrinhoService.addProduto(produto);
    }

    appCtrl.verSeEstaLogado = function(){
        if($rootScope.isLoged == true){
            $rootScope.viewFlag = 3;
        } else {
            $rootScope.viewFlag = 9;
        }
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