module.exports = function (schema, boleto){
  var Servico = schema.Servico;
  var Orcamento = schema.Orcamento;
  var Item = schema.Item;
  var Usuario = schema.Usuario;

  return {
    getBoleto: function(req, res){
      var servicoID = req.query.servico;

      var preco = 0;

      Servico.find({where: {Servico_ID: servicoID}}).then(function(servicoDB){
        Orcamento.find({where: {Servico_ID: servicoID, Foi_Aprovado: true}, include: [{model: Usuario}]}).then(function(orcamentoDB){
          Item.findAll({where: {Orcamento_ID: orcamentoDB.Orcamento_ID}}).then(function(itens){
            for(var i = 0; i < itens.length; i++){
              preco += itens[i].Preco;
            }

            var Boleto = boleto.Boleto;

            if(orcamentoDB.Usuario.Banco == 1){
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
              'cedente': orcamentoDB.Usuario.Nome_Usuario,
              'cedente_cnpj': orcamentoDB.Usuario.CPF_Usuario, // sem pontos e traços
              'agencia': orcamentoDB.Usuario.Agencia,
              'codigo_cedente': orcamentoDB.Usuario.Conta, // PSK (código da carteira)
              'carteira': "102"
            });

            console.log("Linha digitável: " + bol['linha_digitavel'])

            bol.renderHTML(function(html){
              return res.send(html);
            });
          });
        });
      });
      
    }
  }
}