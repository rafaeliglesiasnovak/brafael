var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('CadastroService', ['$http', 'localStorageService', 'md5', function($http, localStorageService, md5) {
    var CadastroService = {
        cadastrar : cadastrar
    };

    return CadastroService;

    function cadastrar(usuario) {
        var json = {};
        json.account = {
            "CPF_Cli": usuario.cpf,
            "Login": usuario.email,
            "Senha": md5.createHash(usuario.senha || ''),
            "Is_Cli": "true"
        }

        json.cliente = {
            "CPF_Cli": usuario.cpf,
            "Nome_Cli": usuario.nome + " " + usuario.sobrenome,
            "Email_Cli": usuario.email,
            "Tel_Cel_Cli": usuario.celular,
            "Tel_Res_Cli": usuario.telefone,
            "Dt_Nascimento_Cli": usuario.nascimento,
            "Sexo_Cli": usuario.sexo
        }

        return $http.post('/v1/cliente/cadastrar', json)
            .success(function(data) {
                if (data.success === false) {
                    return data.message;
                };
                return data.response;
            })
            .error(function(err) {
                return err;
            });
    }

}]);
