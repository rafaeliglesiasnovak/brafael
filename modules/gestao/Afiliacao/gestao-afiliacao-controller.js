module.exports = function (schema){
  var Usuario = schema.Usuario;

  return {
    clientesRange: function(req, res){

      var dataInicial = req.query.dat_ini;
      var dataFinal = req.query.dat_fin;

      dataInicial = dataInicial.slice(2, 4) + "/" + dataInicial.slice(0, 2) + "/" + dataInicial.slice(4, 8);
      dataFinal = dataFinal.slice(2, 4) + "/" + dataFinal.slice(0, 2) + "/" + dataFinal.slice(4, 8);

      dataInicial = new Date(dataInicial);
      dataFinal = new Date(dataFinal);

      var diffDays = Math.ceil((dataFinal - dataInicial) / (1000 * 3600 * 24));

      Usuario.findAll({where: {createdAt:{$gte: dataInicial, $lte: dataFinal}}}).then(function(usuarioDB){

        var x = [];
        var y = [];

        for(var i = 0; i < diffDays; i++){
          var counter = 0;

          var auxDate = new Date(new Date(dataInicial).getTime() + 60 * 60 * 24 * 1000 * i);

          for(var j = 0; j < usuarioDB.length; j++){

            if(auxDate.toDateString() == usuarioDB[j].createdAt.toDateString()){
              counter++;
            }
          }

          x.push(auxDate);
          y.push(counter);
        }
        return res.json({success: true, message: "Dados de afiliação achados", data: {x: x, y: y}});
      });
      
    },
    clientesData: function(req, res){
      var data = req.query.data;

      data = data.slice(2, 4) + "/" + data.slice(0, 2) + "/" + data.slice(4, 8);

      data = new Date(data);

      Usuario.findAll({where:{createdAt: {$lte: data}}}).then(function(usuarioDB){

        var x = [];
        var y = [];

        var graph = {
          "60+": 0,
          "30-60": 0,
          "15-30": 0,
          "10-15": 0,
          "5-10": 0,
          "2-5": 0,
          "0-2": 0
        }

        for(var i = 0; i < usuarioDB.length; i++){
          if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 60){
            graph["60+"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 30){
            graph["30-60"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 15){
            graph["15-30"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 10){
            graph["10-15"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 5){
            graph["5-10"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 2){
            graph["2-5"]++;
          } else if(Math.ceil((data - usuarioDB[i].createdAt) / (1000 * 3600 * 24)) >= 0){
            graph["0-2"]++;
          }
        }
        return res.json({success: true, message: "Dados de afiliação achados", data: graph});
      });
      
    }
  }
}