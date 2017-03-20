module.exports = function(Sequelize, sequelize, schema){

  var Orcamento_Individual = schema.Orcamento_Individual;

	var Item_Pres = sequelize.define('Item_Pres', {
    Orcamento_Individual_ID : {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true
    },
    Preco: Sequelize.FLOAT,
    Descricao: Sequelize.STRING
  });

	return Item_Pres;
}