module.exports = function(Sequelize, sequelize, schema){

  var Servico = schema.Servico;
  var Usuario = schema.Usuario;

	var Orcamento = sequelize.define('Orcamento', {
    Orcamento_ID : {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true
    },
    Servico_ID: {
      type: Sequelize.BIGINT(11),
      references: {
        model: Servico,
        key: 'Servico_ID'
      } 
    },
    CPF_Int:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      }
    },
    Foi_Aprovado: Sequelize.BOOLEAN,
    Quando_Aprovado: Sequelize.DATE
  });

	return Orcamento;

}