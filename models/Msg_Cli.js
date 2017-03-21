module.exports = function(Sequelize, sequelize, schema){

  var Orcamento = schema.Orcamento;
  var Usuario = schema.Usuario;

	var MsgCli = sequelize.define('Msg_Cli', {
    Orcamento_ID:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Orcamento,
        key: 'Orcamento_ID'
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

	return MsgCli;
}