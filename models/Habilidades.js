module.exports = function(Sequelize, sequelize, schema){

  var Usuario = schema.Usuario;

	var Habilidades = sequelize.define('Habilidades', {
	  CPF_Prest: {
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      } 
    },
    Especialidade:Sequelize.STRING
  });

	return Habilidades;

}