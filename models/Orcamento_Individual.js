module.exports = function(Sequelize, sequelize, schema){

  var Orcamento = schema.Orcamento;
  var Usuario = schema.Usuario;

	var Orcamento_Individual = sequelize.define('Orcamento_Individual', {
    Orcamento_Individual_ID : {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true
    },
    Orcamento_ID:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Orcamento,
        key: 'Orcamento_ID'
      }
    },
    CPF_Pres:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      }
    }
  });

	return Orcamento_Individual;
}