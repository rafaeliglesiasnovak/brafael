module.exports = function(Sequelize, sequelize, schema){

  var Orcamento = schema.Orcamento;

	var MsgCli = sequelize.define('Msg_Cli', {
    Orcamento_ID:{
      type: Sequelize.BIGINT(11),
      references: {
        model: Orcamento,
        key: 'Orcamento_ID'
      }
    },
    Texto:Sequelize.STRING
  });

	return MsgCli;
}