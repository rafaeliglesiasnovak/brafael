module.exports = function (moduleCadastro){
  
  var controllers = moduleCadastro.controllers;

  return function(router){
    router.post("/cadastro", function(req, res){
    	controllers.cadastro.post(req, res);
    });
  }

}