module.exports = function(){
	var app = {};
	//http://expressjs.com/
	app.express 		= require('express');
	//https://nodejs.org/api/path.html
	app.path 			= require('path');
	// http://www.embeddedjs.com/
	app.ejs 			= require('ejs');
	//https://nodejs.org/api/http.html#http_http
	app.http 			= require('http');
	//https://github.com/expressjs/morgan
	app.morgan         	= require('morgan');
	//Esse é o que deixa eu usar req.body https://github.com/expressjs/body-parser
	app.bodyParser     	= require('body-parser');
	//https://github.com/expressjs/method-override
	app.methodOverride 	= require('method-override');
	//https://lodash.com/
	app._				= require('lodash');
	//https://github.com/expressjs/multer
	app.multer  		= require('multer');
	//https://github.com/pagarme/node-boleto
	app.boleto 			= require('node-boleto');
	// Arquivo de configuracoes
  	app.config 			= require('./config')();

	// https://github.com/nodemailer/nodemailer
	var nodemailer = require('nodemailer');
  	var transporter = nodemailer.createTransport('smtps://3rafaelshoes@gmail.com:rafaelrafaelrafael@smtp.gmail.com');

	// http://docs.sequelizejs.com/en/latest/
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(app.config.db().db, app.config.db().user, app.config.db().psswrd, {
  		host: app.config.db().host,
  		dialect: app.config.db().dialect,
  		port: app.config.db().port,
  		pool: {
    		max: 5,
    		min: 1,
    		idle: 100
  		},
  		quoteIdentifiers:false,
  		omitNull: true
	});
	sequelize
		.authenticate()
		.then(function(err) {
			console.log('Connection has been established successfully.');


		})
		.catch(function (err) {
			console.log('Unable to connect to the database:', err);
		});

	//Schema
	var schema = {};
	schema.Usuario = require(__dirname + '/models/Usuario.js')(Sequelize, sequelize);
	schema.Habilidades = require(__dirname + '/models/Habilidades.js')(Sequelize, sequelize, schema);
	schema.Tempo_Uso = require(__dirname + '/models/Tempo_Uso.js')(Sequelize, sequelize, schema);
	schema.Servico = require(__dirname + '/models/Servico.js')(Sequelize, sequelize, schema);
	schema.Orcamento = require(__dirname + '/models/Orcamento.js')(Sequelize, sequelize, schema);
	schema.Item = require(__dirname + '/models/Item.js')(Sequelize, sequelize, schema);
	schema.Msg_Cli = require(__dirname + '/models/Msg_Cli.js')(Sequelize, sequelize, schema);
	schema.Orcamento_Individual = require(__dirname + '/models/Orcamento_Individual.js')(Sequelize, sequelize, schema);
	schema.Item_Pres = require(__dirname + '/models/Item_Prestador.js')(Sequelize, sequelize, schema);
	schema.Msg_Pres = require(__dirname + '/models/Msg_Pres.js')(Sequelize, sequelize, schema);


	// Schema Associations
	//Servico
	schema.Servico.belongsTo(schema.Usuario, {foreignKey: 'CPF_Cli', onDelete: 'CASCADE'});
	schema.Servico.hasMany(schema.Orcamento, {foreignKey: 'Servico_ID', onDelete: 'CASCADE'});
	//Orçamento
	schema.Orcamento.belongsTo(schema.Servico, {foreignKey: 'Servico_ID', onDelete: 'CASCADE'});
	schema.Orcamento.belongsTo(schema.Usuario, {foreignKey: 'CPF_Int', onDelete: 'CASCADE'});
	schema.Orcamento.hasMany(schema.Item, {foreignKey: 'Orcamento_ID', onDelete: 'CASCADE'});
	schema.Orcamento.hasMany(schema.Orcamento_Individual, {foreignKey: 'Orcamento_ID', onDelete: 'CASCADE'});
	//Item
	schema.Item.belongsTo(schema.Orcamento, {foreignKey: 'Orcamento_ID', onDelete: 'CASCADE'});
	//Msg_Cli
	schema.Msg_Cli.belongsTo(schema.Orcamento, {foreignKey: 'Orcamento_ID', onDelete: 'CASCADE'});
	schema.Msg_Cli.belongsTo(schema.Usuario, {foreignKey: 'Usuario_Origem', onDelete: 'CASCADE'});
	//Orcamento_Individual
	schema.Orcamento_Individual.belongsTo(schema.Orcamento, {foreignKey: 'Orcamento_ID', onDelete: 'CASCADE'});
	schema.Orcamento_Individual.belongsTo(schema.Usuario, {foreignKey: 'CPF_Int', onDelete: 'CASCADE'});
	schema.Orcamento_Individual.hasMany(schema.Item_Pres, {foreignKey: 'Orcamento_Individual_ID', onDelete: 'CASCADE'});
	//Item_Prestador
	schema.Item_Pres.belongsTo(schema.Orcamento_Individual, {foreignKey: 'Orcamento_Individual_ID', onDelete: 'CASCADE'});
	//Msg_Prestador
	schema.Msg_Pres.belongsTo(schema.Orcamento_Individual, {foreignKey: 'Orcamento_Individual_ID', onDelete: 'CASCADE'});
	schema.Msg_Pres.belongsTo(schema.Usuario, {foreignKey: 'Usuario_Origem', onDelete: 'CASCADE'});
	//Habilidades
	schema.Habilidades.belongsTo(schema.Usuario, {foreignKey: 'CPF_Pres', onDelete: 'CASCADE'});
	//Msg_Prestador
	schema.Tempo_Uso.belongsTo(schema.Usuario, {foreignKey: 'CPF_Int', onDelete: 'CASCADE'});
	

	sequelize

	  .sync({force: true})
	  .then(function(err) {
	  	var user = {CPF_Usuario: 1, Nome_Usuario: "Fet", Email_Usuario: "fet", Senha: 1, Nota: 0, Qtd_Avaliacao: 0, Tipo_Usuario: 0};

	  	schema.Usuario.create(user).then(function(usuarioDB){
	  		user.CPF_Usuario = 2;
	  		user.Email_Usuario = "rice";
	  		user.Tipo_Usuario = 1;

	  		schema.Usuario.create(user).then(function(usuarioDB){
		  		user.CPF_Usuario = 3;
		  		user.Email_Usuario = "prig";
		  		user.Tipo_Usuario = 2;

		  		schema.Usuario.create(user).then(function(usuarioDB){
		  			var date = new Date();

		  			var servico = {Data_Limite: date.setDate(date.getDate() + 5), Descricao: "Serviço teste", Esta_Finalizado: false, Esta_Pago: true, CPF_Cli: 1, Quando_Pago: date.setDate(date.getDate() - 2), Quando_Finalizado: date.setDate(date.getDate() - 4)};

		  			schema.Servico.create(servico).then(function(servicoDB){
		  				var orcamento = {Servico_ID: 1, CPF_Int: 2, Foi_Aprovado: true};

		  				schema.Orcamento.create(orcamento).then(function(orcamentoDB){
		  					var lista = [{Descricao: "Servico Integrador", Preco: 12.2, Orcamento_ID: 1},
		  					{Descricao: "Locomoção", Preco: 100, Orcamento_ID: 1},
		  					{Descricao: "Caçamba", Preco: 45, Orcamento_ID: 1}];

		  					schema.Item.bulkCreate(lista).then(function(){
		  						console.log("Deu bom!!!");
					        });
		  				});
		  			});
			  	});
		  	});
	  	});
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });

	  
	  // .sync()
	  // .then(function(err) {
	  //   console.log('It worked!');
	  // }, function (err) { 
	  //   console.log('An error occurred while creating the table:', err);
	  // });

	//Middleware
	// var middleware = {};
	// var storage = app.multer.diskStorage({
	//   destination: function (req, file, cb) {
	//     cb(null, __dirname + '/public/images/produto/')
	//   },
	//   filename: function (req, file, cb) {
	//     app.crypto.pseudoRandomBytes(16, function (err, raw) {
	//       cb(null, raw.toString('hex') + app.path.extname(file.originalname));
	//     });
	//   }
	// });
	// middleware.upload = app.multer({ storage: storage });

	//Cadastro
	var cadastro = {};
	cadastro.controllers = {};
	cadastro.controllers.cadastro = require(__dirname + '/modules/cadastro/cadastro-controller.js')(schema);

	//Servico
	var servico = {};
	servico.controllers = {};
	servico.controllers.servico = require(__dirname + '/modules/servico/servico-controller.js')(schema);

	//Orçamento
	var orcamento = {};
	orcamento.controllers = {};
	orcamento.controllers.orcamento = require(__dirname + '/modules/orcamento/orcamento-controller.js')(schema);

	//Pagamento
	var pagamento = {};
	pagamento.controllers = {};
	pagamento.controllers.pagamento = require(__dirname + '/modules/pagamento/pagamento-controller.js')(schema, app.boleto);

	//Gestao
	var gestao = {};
	gestao.controllers = {};
	gestao.controllers.pagamento = require(__dirname + '/modules/gestao/pagamento/gestao-pagamento-controller.js')(schema);

	//Rotas
	var routes = {};
	routes.routes = require(__dirname + '/routes/router.js')(app.express, routes);
	routes.v1 = {};
	routes.v1.orcamento = require(__dirname + '/routes/v1/orcamento.js')(orcamento);
	routes.v1.cadastro = require(__dirname + '/routes/v1/cadastro.js')(cadastro);
	routes.v1.servico = require(__dirname + '/routes/v1/servico.js')(servico);
	routes.v1.pagamento = require(__dirname + '/routes/v1/pagamento.js')(pagamento);
	routes.v1.gestao = require(__dirname + '/routes/v1/gestao.js')(gestao);
	routes.view = {};
	routes.view.view = require(__dirname + '/routes/view/view.js')(app.path);

	return {
		app: app,
		router: routes.routes
	}

}