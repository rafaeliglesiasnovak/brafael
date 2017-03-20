module.exports = function(Sequelize, sequelize){


	var Usuario = sequelize.define('Usuario', {
		CPF_Usuario: {
  		type: Sequelize.BIGINT(11),
  		primaryKey: true,
      autoIncrement: false
		},
    Nome_Usuario: Sequelize.STRING,
    Email_Usuario: Sequelize.STRING,
    Senha: Sequelize.STRING,
    Nota: Sequelize.FLOAT,
    Qtd_Avaliacao: Sequelize.INTEGER,    
    Tipo_Usuario: Sequelize.INTEGER, // 0 Cliente ; 1 Integrador ; 2 Prestador //
    Banco: Sequelize.INTEGER, //0 Bradesco; 1 Santander
    Conta: Sequelize.INTEGER,
    Agencia: Sequelize.INTEGER
	});

	return Usuario;

}