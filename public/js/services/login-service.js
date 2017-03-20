// each function returns a promise object 
app.factory('LoginService', ['$rootScope', '$http', 'localStorageService', 'md5', '$auth', 
    function($rootScope, $http, localStorageService, md5, $auth) {
    var LoginService = {
        login : login,
        logout : logout
    };

    return LoginService;

    function login(credentials) {
      console.log(credentials);

      // Use Satellizer's $auth service to login
      $auth.login(credentials)
          .then(function(data) {
              console.log(data);
            var usuario = data.data.usuario;

            localStorageService.set('cpf', usuario.CPF_Cli);
            localStorageService.set('nome', usuario.Nome_Cli);
            localStorageService.set('celular', usuario.Tel_Cel_Cli);
            localStorageService.set('telefone', usuario.Tel_Res_Cli);
            localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
            localStorageService.set('sexo', usuario.Sexo_Cli);
            localStorageService.set('email', usuario.Email_Cli);
            $rootScope.isLogado = true;

            $rootScope.viewFlag = 1;

            return true;

            })
          .catch(function(err) {
              console.dir(err);
              return err;
          });
      }

    function logout() {

      localStorageService.clearAll();

      $rootScope.isLogado = false;

      $rootScope.viewFlag = 1;
      }

}]);
