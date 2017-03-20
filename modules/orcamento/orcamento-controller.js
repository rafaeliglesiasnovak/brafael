module.exports = function (schema){
  var Usuario = schema.Usuario;
  var Orcamento = schema.Orcamento;
  var Msg_Cli = schema.Msg_Cli;
  var Item = schema.Item;

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
        Foi_Aprovado: true //TODO Arrumar isso pelamordedeus
      }

      Orcamento.create(orcamento).then(function(orcamentoDB){
        for(var i = 0; i < lista.length; i++){
          lista[i].Orcamento_ID = orcamentoDB.Orcamento_ID;
        }

        Item.bulkCreate(lista).then(function(){
          if(mensagem){
            Msg_Cli.create({Orcamento_ID: orcamentoDB.Orcamento_ID, Texto: mensagem}).then(function(MsgDB){
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
      var usuarioDestino = req.body.userTo;
      var servico = req.body.servicoID;
      var mensagem = req.body.mensagem;

      Usuario.find({CPF_Usuario: usuario}).then(function(usuarioDB){
        if(usuarioDB.Tipo_Usuario == 0){
          MsgCli.create({CPF_Usuario: usuario,Servico_ID: servico,Texto: mensagem}).then(function(mensagemDB){
            return res.json({success: true, message: 'Mensagem enviada com sucesso'});
          });
        } else if(usuarioDB.Tipo_Usuario == 2){
          MsgPres.create({CPF_Usuario: usuario,Servico_ID: servico,Texto: mensagem}).then(function(mensagemDB){
            return res.json({success: true, message: 'Mensagem enviada com sucesso'});
          });
        } else {
          Usuario.find({CPF_Usuario: usuarioDestino}).then(function(usuarioDestinoDB){
            if(usuarioDestinoDB.Tipo_Usuario == 0){
              MsgCli.create({CPF_Usuario: usuario,Servico_ID: servico,Texto: mensagem}).then(function(mensagemDB){
                return res.json({success: true, message: 'Mensagem enviada com sucesso'});
              });
            } else if(usuarioDestinoDB.Tipo_Usuario == 2){
              MsgPres.create({CPF_Usuario: usuario,Servico_ID: servico,Texto: mensagem}).then(function(mensagemDB){
                return res.json({success: true, message: 'Mensagem enviada com sucesso'});
              });
            }
          });
        }
      });
    },

    get: function(req, res){
      var servico = req.body.servicoID;

      Orcamento.findAll({Servico_ID: servico}).then(function(orcamentos){
        return res.json({success: true, messagem: "Orçamentos encontrados", data: orcamentos});
      })
    }
  }
}