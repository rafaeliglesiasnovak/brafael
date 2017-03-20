module.exports = function(Sequelize, sequelize, schema){

  var Orcamento = schema.Orcamento;

	var Item = sequelize.define('Item', {
    Orcamento_ID: {
      type: Sequelize.BIGINT(11),
      references: {
        model: Orcamento,
        key: 'Orcamento_ID'
      } 
    },
    Preco: Sequelize.FLOAT,
    Descricao: Sequelize.STRING
  });

	return Item;

}