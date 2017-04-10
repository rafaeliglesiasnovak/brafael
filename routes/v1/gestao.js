module.exports = function (moduleGestao){
  
  var controllers = moduleGestao.controllers;

  return function(router){
    router.get("/gestao/pagamento", function(req, res){
    	controllers.pagamento.pagInt(req, res);
    });
  }

}