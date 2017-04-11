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
	  	/* ====== populate ====== */
	  	//==Usuarios
	  	var users = [];
		var names = ["Joao","Andre","Pedro","Ramires","Claudia","Alice","Maria",
			"Bruno","Carlos","Rafael","Leticia","Laura","Renata","Mario", "Aline",
			"Henrique", "Juliano", "Julia", "Mateus", "Priscila", "Monica", "Eduardo",
			"Roberta", "Suzana", "Marilia", "Simone", "Larissa", "Rafaela", "Paula",
			"Maiara", "Ines", "Diego", "Felipe", "Marcos", "Lucas", "Alex"];
		var surnames = ["Silva","Oliveira","Snow","Machado","Cabral","Medeiros","Ribeiro",
			"Duarte","Pereira","Correia","Novaes","Batista","Pinheiros","Luz", "Costa",
			"Lima", "Mesquita", "Nunes", "Pires", "Martins", "Mendonca", "Vaz", "Carvalho",
			"Mafra", "Santos", "Vasconcelos", "Dias", "Moraes", "Rocha", "Sales" ];

		for (var i = 0; i < 300; i++) {
			var name = names[Math.floor(Math.random() * names.length)] + ' ' +
			surnames[Math.floor(Math.random() * surnames.length)];
			var email = name.replace(/\s/g, '.').toLowerCase() + '@gmail.com';
			var nota = Math.floor(Math.random() * 51 )/10;
			var qntd = Math.floor(Math.random() * 200);
			var tipo = i%3;
			var criadoEm = new Date() - Math.floor(Math.random()*2*365*24*60*60*1000); //past 2 years
			users.push({CPF_Usuario: i, Nome_Usuario: name, Email_Usuario: email, Senha: 123,
				Nota: nota, Qtd_Avaliacao: qntd, Tipo_Usuario: tipo, createdAt:criadoEm});
		}

	  	schema.Usuario.bulkCreate(users).then(function(usuarioDB){
	  		//==Servicos
  			var date = new Date();
			var servicos = [];

			for (var i = 0; i < 200; i++) {
				var descricao = "Servico no. " + (i+1);
				var cpf = Math.floor(Math.random() * users.length/3)*3; //get only Cliente
				var taTerminado = Math.floor(Math.random() * 2);
				var taPago = Math.floor(Math.random() * 2);

				var tempoAtras =  Math.floor(Math.random()*2*365*24*60*60*1000); //past 2 years
				var criadoEm = new Date() - tempoAtras;
				var dtLimite = criadoEm + Math.floor(Math.random() * tempoAtras);
				var dtTermino = criadoEm + Math.floor(Math.random() * tempoAtras);
				var dtPagamento = criadoEm + Math.floor(Math.random() * tempoAtras);

				servicos.push({Data_Limite: dtLimite, Descricao: descricao,Esta_Finalizado: taTerminado,
					Esta_Pago: taPago, CPF_Cli: cpf, Quando_Pago: dtPagamento, Quando_Finalizado:dtTermino,
					createdAt:criadoEm});
			}

			schema.Servico.bulkCreate(servicos).then(function(servicoDB){
				var orcamentos = [];

				for (var i = 0; i < 200; i++) {
					var cpf = Math.floor(Math.random() * users.length/3)*3 + 1; //get only Integrador
					var servico =  Math.floor(Math.random() * servicos.length) + 1;
					var aprovado = Math.floor(Math.random() * 2);
					var criadoEm = new Date() - Math.floor(Math.random()*2*365*24*60*60*1000); //past 2 years
					orcamentos.push({Servico_ID: servico, CPF_Int: cpf,
						Foi_Aprovado: aprovado, createdAt: criadoEm});
				}


				schema.Orcamento.bulkCreate(orcamentos).then(function(orcamentoDB){
  					var lista = [{Descricao: "Servico Integrador", Preco: 12.2, Orcamento_ID: 1},
						{Descricao: "Locomoção", Preco: 100, Orcamento_ID: 1},
						{Descricao: "Caçamba", Preco: 45, Orcamento_ID: 1}];

					schema.Item.bulkCreate(lista).then(function(){
						console.log("Deu bom!!!");
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
	gestao.controllers.afiliacao = require(__dirname + '/modules/gestao/afiliacao/gestao-afiliacao-controller.js')(schema);
	gestao.controllers.orcamento = require(__dirname + '/modules/gestao/orcamento/gestao-orcamento-controller.js')(schema);

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