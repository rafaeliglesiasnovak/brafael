module.exports = function (schema, boleto){
  var Servico = schema.Servico;
  var Orcamento = schema.Orcamento;
  var Item = schema.Item;
  var Usuario = schema.Usuario;
  var Orcamento_Individual = schema.Orcamento_Individual;
  var Item_Pres = schema.Item_Pres;

  return {
    getBoleto: function(req, res){
      var servicoID = req.query.servico;

      var preco = 0;

      Servico.find({where: {Servico_ID: servicoID}, include: [{model:Orcamento, where:{Foi_Aprovado: true}, include: [{model: Item}, {model:Usuario}, {model: Orcamento_Individual, include: [{model: Item_Pres}]}]}]}).then(function(servicoDB){

        for(var i = 0; i < servicoDB.Orcamentos[0].Items.length; i++){
          preco += servicoDB.Orcamentos[0].Items[i].Preco;
        }

        if(servicoDB.Orcamentos[0].Orcamento_Individuals[0]){
          for(var i = 0; i < servicoDB.Orcamentos[0].Orcamento_Individuals[0].Item_Pres.length; i++){
            preco += servicoDB.Orcamentos[0].Items[i].Preco;
          }
        }

        var Boleto = boleto.Boleto;

        if(servicoDB.Orcamentos[0].Usuario.Banco == 1){
          var banco = "santander";
        } else {
          var banco = "bradesco"
        }

        var bol = new Boleto({
          'banco': banco, // nome do banco dentro da pasta 'banks'
          'data_emissao': new Date(),
          'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
          'valor': preco*100, // R$ 15,00 (valor em centavos)
          'nosso_numero': "1234567",
          'numero_documento': "123123",
          'cedente': servicoDB.Orcamentos[0].Usuario.Nome_Usuario,
          'cedente_cnpj': servicoDB.Orcamentos[0].Usuario.CPF_Usuario, // sem pontos e traços
          'agencia': servicoDB.Orcamentos[0].Usuario.Agencia,
          'codigo_cedente': servicoDB.Orcamentos[0].Usuario.Conta, // PSK (código da carteira)
          'carteira': "102"
        });

        console.log("Linha digitável: " + bol['linha_digitavel'])

        bol.renderHTML(function(html){
          return res.send(html);
        });
      });
      
    },

    intregradorConfirm: function(req, res){
      var servico = req.body.servicoID;

      Servico.update({Esta_Pago:true}, {where:{Servico_ID: servico}}).then(function(servicos){
        return res.json({success: true, message: "Sevico atualizado", data: servicos});
      })
    }
  }
}