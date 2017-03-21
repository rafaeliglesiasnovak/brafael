module.exports = function(Sequelize, sequelize, schema){

  var Orcamento_Individual = schema.Orcamento_Individual;
  var Usuario = schema.Usuario;

	var MsgPres = sequelize.define('Msg_Pres', {
    Orcamento_Individual_ID:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Orcamento_Individual,
        key: 'Orcamento_Individual_ID'
      }
    },
    Usuario_Origem:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Usuario,
        key: 'CPF_Usuario'
      }
    },
    Texto:Sequelize.STRING
  });

	return MsgPres;
}