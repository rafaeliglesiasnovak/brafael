module.exports = function(Sequelize, sequelize, schema){

  var Usuario = schema.Usuario;

	var Tempo_Uso = sequelize.define('Tempo_Uso', {
    CPF_Int: {
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      } 
    },
    Mes: {
      type: Sequelize.BIGINT(6),  // ano&&mes Ex: 201703 //
      autoIncrement: false
    },
    Tempo: Sequelize.DOUBLE, // Segundos //
    Esta_Pago:Sequelize.BOOLEAN,
    Quando_Pago:Sequelize.DATE
  });

	return Tempo_Uso;

}