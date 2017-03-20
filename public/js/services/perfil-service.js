var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('PerfilService', ['$http', 'localStorageService', 'md5', function($http, localStorageService, md5) {
    var PerfilService = {
        editar : editar
    };

    return PerfilService;

    function editar(usuario) {
        var json = {};

        json.cliente = {
            "CPF_Cli": usuario.cpf,
            "Nome_Cli": usuario.nome + " " + usuario.sobrenome,
            "Email_Cli": usuario.email,
            "Tel_Cel_Cli": usuario.celular,
            "Tel_Res_Cli": usuario.telefone,
            "Dt_Nascimento_Cli": usuario.nascimento,
            "Sexo_Cli": usuario.sexo
        }

        return $http.post('/v1/cliente/editar', json)
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