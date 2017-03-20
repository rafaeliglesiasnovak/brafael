module.exports = function (schema){
  var Usuario = schema.Usuario;

  return {
    post: function (req, res) {
      var cpf = req.body.cpf;
      var nome = req.body.nome;
      var email = req.body.email;
      var senha = req.body.senha;
      var tipo = req.body.tipo;
      var banco = req.body.banco;
      var agencia = req.body.agencia;
      var conta = req.body.conta;

      var usuario = {
        CPF_Usuario: cpf,
        Nome_Usuario: nome,
        Email_Usuario: email,
        Senha: senha,
        Nota: 0,
        Qtd_Avaliacao: 0,
        Tipo_Usuario: tipo
      }

      if(banco && agencia && conta){
        usuario.Banco = banco;
        usuario.Agencia = agencia;
        usuario.Conta = conta;
      }

      Usuario.find({where: {Email_Usuario: email}}).then(function(userFoundDB){
        if(userFoundDB){
          return res.json({success: false, message: "Email já cadastrado"});
        } else {
          Usuario.find({where: {CPF_Usuario: cpf}}).then(function(userFoundDB){
            if(userFoundDB){
              return res.json({success: false, message: "CPF já cadastrado"});
            } else {
              Usuario.create(usuario).then(function(usuarioDB){
                return res.json({success: true, message: 'Usuário criado com sucesso', data: usuarioDB});
              });
            }
          });
        }
      });
    }
  }
}