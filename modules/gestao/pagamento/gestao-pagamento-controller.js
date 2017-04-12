module.exports = function (schema){
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

        var x = [];
        var y = [];

        for(var i = 0; i < diffDays; i++){
          var counter = 0;

          var auxDate = new Date(new Date(dataInicial).getTime() + 60 * 60 * 24 * 1000 * i);

          for(var j = 0; j < servicoDB.length; j++){

            if(auxDate.toDateString() == servicoDB[j].Quando_Pago.toDateString()){
              counter++;
            }
          }

          x.push(auxDate);
          y.push(counter);
        }
        return res.json({success: true, message: "Dados de pagamento achados", data: {x: x, y: y}});
      });
      
    },
    pagPend: function(req, res){
      var data = req.query.data;

      data = data.slice(2, 4) + "/" + data.slice(0, 2) + "/" + data.slice(4, 8);

      data = new Date(data);

      Servico.findAll({$or: [{Esta_Pago: false}, {Quando_Pago: {$gt: data}}]}).then(function(servicoDB){

        var x = ["0-2 dias", "2-5 dias", "5-10 dias", "10-15 dias", "15-30 dias", "30-60 dias", "60+ dias"];
        var y = [0, 0, 0, 0, 0, 0, 0];

        for(var i = 0; i < servicoDB.length; i++){
          if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 60){
            y[6]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 30){
            y[5]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 15){
            y[4]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 10){
            y[3]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 5){
            y[2]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 2){
            y[1]++;
          } else if(Math.ceil((data - servicoDB[i].Quando_Finalizado) / (1000 * 3600 * 24)) >= 0){
            y[0]++;
          }
        }
        return res.json({success: true, message: "Dados de pagamento achados", data: {x: x, y: y}});
      });
      
    }
  }
}