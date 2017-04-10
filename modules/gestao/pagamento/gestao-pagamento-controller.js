module.exports = function (schema, boleto){
  var Servico = schema.Servico;

  return {
    pagInt: function(req, res){
      var dataInicial = req.query.dat_ini;
      var dataFinal = req.query.dat_fin;

      dataInicial = dataInicial.slice(2, 4) + "/" + dataInicial.slice(0, 2) + "/" + dataInicial.slice(4, 8);
      dataFinal = dataFinal.slice(2, 4) + "/" + dataFinal.slice(0, 2) + "/" + dataFinal.slice(4, 8);

      dataInicial = new Date(dataInicial);
      dataFinal = new Date(dataFinal);

      var diffDays = Math.ceil((dataFinal - dataInicial) / (1000 * 3600 * 24));

      Servico.findAll({where: {Quando_Pago:{$gte: dataInicial, $lte: dataFinal}}}).then(function(servicoDB){

        console.log(dataInicial.toDateString());
        console.log(servicoDB[0].Quando_Pago.toDateString());

        var x = [];
        var y = [];

        for(var i = 0; i < diffDays; i++){
          var counter = 0;
          for(var j = 0; j < servicoDB.length; j++){
            var auxDate = new Date(new Date(dataInicial).getTime() + 60 * 60 * 24 * 1000 * i);

            if(auxDate.toDateString() == servicoDB[j].Quando_Pago.toDateString()){
              counter++;
            }
          }

          x.push(auxDate);
          y.push(counter);
        }
        return res.json({success: true, message: "Sevico atualizado", data: {x: x, y: y}});
      });
      
    }
  }
}