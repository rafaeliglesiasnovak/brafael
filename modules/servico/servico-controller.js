module.exports = function (schema){
  var Servico = schema.Servico;
  var Orcamento = schema.Orcamento;
  var Item = schema.Item;

  return {
    post: function (req, res) {
      var cpf = req.body.cpf;
      var date = req.body.date;
      var descricao = req.body.descricao;

      var servico = {
        Data_Limite: date,
        Descricao: descricao,
        Esta_Finalizado: false,
        Esta_Pago: false,
        CPF_Cli: cpf
      }

      Servico.create(servico).then(function(servicoDB){
        return res.json({success: true, message: "Serviço criado com sucesso", data: servicoDB});
      });
    },
    getPreco: function(req, res){
      var servicoID = req.query.servico;

      var preco = 0;

      Servico.find({where: {Servico_ID: servicoID}}).then(function(servicoDB){
        Orcamento.find({where: {Servico_ID: servicoID, Foi_Aprovado: true}}).then(function(orcamentoDB){
          Item.findAll({where: {Orcamento_ID: orcamentoDB.Orcamento_ID}}).then(function(itens){
            for(var i = 0; i < itens.length; i++){
              preco += itens[i].Preco;
            }

            return res.json({success: true, message: "Preço encontrado", data: preco});
          });
        });
      });
    }
  }
}