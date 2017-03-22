module.exports = function (moduleServico){
  
  var controllers = moduleServico.controllers;

  return function(router){
    router.post("/servico", function(req, res){
    	controllers.servico.post(req, res);
    });

    router.get("/servico", function(req, res){
    	controllers.servico.get(req, res);
    });

    router.get("/servico/preco", function(req, res){
    	controllers.servico.getPreco(req, res);
    });
  }

}