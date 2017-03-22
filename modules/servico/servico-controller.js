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
    get: function (req, res) {
      var cpf = req.query.cpf;

      Servico.findAll({where: {CPF_Cli: cpf}}).then(function(servicos){
        return res.json({success: true, message: "Serviços encontrados", data: servicos});
      });
    },
    getPreco: function(req, res){
      var servicoID = req.query.servico;

      var preco = 0;

      Orcamento.find({where: {Servico_ID: servicoID, Foi_Aprovado: true}, include: {model:Item}}).then(function(orcamentoDB){
        for(var i = 0; i < orcamentoDB.Items.length; i++){
          preco += orcamentoDB.Items[i].Preco;
        }

        return res.json({success: true, message: "Preço encontrado", data: preco});
      });
    }
  }
}