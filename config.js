module.exports = function (){
	return{
		// constantes do projeto
		apiSecret : function(){
		// chave para validacao do token para usuarios comuns: rafael-shoes-api-secret md5
			return 'c952eb6adf9904d93458909af1d1cc71';
		},
		saltRounds : function(){
			return 4;
		},
		db : function(){
			return {
				db: 'brafael',
				user: 'root',
				psswrd: 'root',
				host: '0.tcp.ngrok.io',
				port: '16500',
				dialect: 'mysql'
			};
		}
	};
}