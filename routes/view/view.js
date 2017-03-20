module.exports = function (path){

  return function(router){
    router.get("/", function(req, res){
    	res.render(path.resolve('views/index.html'));
    });
    
    router.get("/orcamento", function(req, res){
    	res.render(path.resolve('views/orcamento.html'));
    });
  }

}