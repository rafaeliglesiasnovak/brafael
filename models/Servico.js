module.exports = function(Sequelize, sequelize, schema){

  var Usuario = schema.Usuario;

	var Servico = sequelize.define('Servico', {
		Servico_ID: {
  		type: Sequelize.BIGINT(11),
  		primaryKey: true,
      autoIncrement: true
		},
    Data_Limite: Sequelize.DATE,
    Descricao: Sequelize.STRING,
    Esta_Finalizado: Sequelize.BOOLEAN,
    Esta_Pago: Sequelize.BOOLEAN,
    CPF_Cli: {
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      } 
    }
  });

	return Servico;

}