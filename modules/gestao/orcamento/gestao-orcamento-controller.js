module.exports = function (schema){
  var Orcamento = schema.Orcamento;
  var Servico = schema.Servico;

  return {
    servicoRange: function(req, res){

      var dataInicial = req.query.dat_ini;
      var dataFinal = req.query.dat_fin;

      dataInicial = dataInicial.slice(2, 4) + "/" + dataInicial.slice(0, 2) + "/" + dataInicial.slice(4, 8);
      dataFinal = dataFinal.slice(2, 4) + "/" + dataFinal.slice(0, 2) + "/" + dataFinal.slice(4, 8);

      dataInicial = new Date(dataInicial);
      dataFinal = new Date(dataFinal);

      var diffDays = Math.ceil((dataFinal - dataInicial) / (1000 * 3600 * 24));

      Servico.findAll({where: {Quando_Finalizado:{$gte: dataInicial, $lte: dataFinal}}}).then(function(servicoDB){

        var x = [];
        var y = [];

        for(var i = 0; i < diffDays; i++){
          var counter = 0;

          var auxDate = new Date(new Date(dataInicial).getTime() + 60 * 60 * 24 * 1000 * i);

          for(var j = 0; j < servicoDB.length; j++){

            if(auxDate.toDateString() == servicoDB[j].Quando_Finalizado.toDateString()){
              counter++;
            }
          }

          x.push(auxDate);
          y.push(counter);
        }
        return res.json({success: true, message: "Dados de Serviço achados", data: {x: x, y: y}});
      });
      
    },
    orcamentoRange: function(req, res){

      var dataInicial = req.query.dat_ini;
      var dataFinal = req.query.dat_fin;

      dataInicial = dataInicial.slice(2, 4) + "/" + dataInicial.slice(0, 2) + "/" + dataInicial.slice(4, 8);
      dataFinal = dataFinal.slice(2, 4) + "/" + dataFinal.slice(0, 2) + "/" + dataFinal.slice(4, 8);

      dataInicial = new Date(dataInicial);
      dataFinal = new Date(dataFinal);

      var diffDays = Math.ceil((dataFinal - dataInicial) / (1000 * 3600 * 24));

      Orcamento.findAll({where: {createdAt:{$gte: dataInicial, $lte: dataFinal}}}).then(function(orcamentoDB){

        var x = [];
        var y = [];

        for(var i = 0; i < diffDays; i++){
          var counter = 0;

          var auxDate = new Date(new Date(dataInicial).getTime() + 60 * 60 * 24 * 1000 * i);

          for(var j = 0; j < orcamentoDB.length; j++){

            if(auxDate.toDateString() == orcamentoDB[j].createdAt.toDateString()){
              counter++;
            }
          }

          x.push(auxDate);
          y.push(counter);
        }
        return res.json({success: true, message: "Dados de Orçamento achados", data: {x: x, y: y}});
      });
      
    }
  }
}