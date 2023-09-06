const Sequelize = require('sequelize');

const sequelize = new Sequelize("servidorbeta", "root", "123456", {
    host: 'localhost',
    dialect: 'mysql'
});
//utilizar somente para terst
sequelize.authenticate()
    .then(function () {
        console.log("Conexão com o banco de dados realizada com sucesso!")

    }).catch(function () {
        console.log("ERRO: Conexão com o banco de dados não realizada com sucesso!")
    });

module.exports = sequelize;