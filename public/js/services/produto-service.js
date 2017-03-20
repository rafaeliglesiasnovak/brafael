var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('ProdutoService', [function() {
    var ProdutoService = {
        selectProduto : selectProduto,
        getProduto : getProduto
    };

    return ProdutoService;

    var serviceProduto = {};

    function getProduto(){
        return serviceProduto;
    }

    function selectProduto(produto) {
        serviceProduto = produto;
    };

}]);