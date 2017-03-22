module.exports = function (schema){
  var Usuario = schema.Usuario;
  var Orcamento = schema.Orcamento;
  var Msg_Cli = schema.Msg_Cli;
  var Item = schema.Item;
  var Servico = schema.Servico;

  return {
    post: function (req, res) {

      var servico = req.body.servicoID;
      var cpf = req.body.cpf;
      var mensagem = req.body.mensagem;
      var lista = req.body.lista; // -> Array {Descricao: , Preco: }

      //var orcamentos = req.body.lista // -> Array {Orcamento_Individual_ID: }

      var orcamento = {
        Servico_ID: servico,
        CPF_Int: cpf,
        Foi_Aprovado: false
      }

      Orcamento.create(orcamento).then(function(orcamentoDB){
        for(var i = 0; i < lista.length; i++){
          lista[i].Orcamento_ID = orcamentoDB.Orcamento_ID;
        }

        Item.bulkCreate(lista).then(function(){
          if(mensagem){
            Msg_Cli.create({Orcamento_ID: orcamentoDB.Orcamento_ID, Usuario_Origem:cpf, Texto: mensagem}).then(function(MsgDB){
              return res.json({success: true, message: "Orçamento criado com sucesso", data: orcamentoDB});
            });
          } else {
            return res.json({success: true, message: "Orçamento criado com sucesso", data: orcamentoDB});
          }
        });
      });
    },

    postMessage: function(req, res){
      var usuario = req.body.userID;
      var orcamento = req.body.orcamentoID;
      var mensagem = req.body.mensagem;

      Msg_Cli.create({Orcamento_ID: orcamento, Usuario_Origem:usuario, Texto: mensagem}).then(function(msgDB){
        return res.json({success: true, message: "Mensagem enviada com sucesso", data: msgDB});
      });
    },

    getMessage: function(req, res){
      var orcamento = req.query.orcamentoID;

      Msg_Cli.findAll({where: {Orcamento_ID: orcamento}}).then(function(msgDB){
        return res.json({success: true, message: "Mensagens encontradas com sucesso", data: msgDB});
      });
    },

    get: function(req, res){
      var servico = req.query.servicoID;

      Orcamento.findAll({Servico_ID: servico}).then(function(orcamentos){
        return res.json({success: true, messagem: "Orçamentos encontrados", data: orcamentos});
      })
    },

    aprovarOrcamento: function(req, res){
      var orcamento = req.body.orcamentoID;

      Orcamento.update({Foi_Aprovado: true}, {where: {Orcamento_ID: orcamento}}).then(function(orcamentoDB){
        return res.json({success: true, messagem: "Orçamento aprovado", data: orcamentoDB});
      })
    }
  }
}