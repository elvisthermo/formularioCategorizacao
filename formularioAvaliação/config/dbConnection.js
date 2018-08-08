/* importar o mongodb */
let mongo = require('mongodb');

let connMongoDB = function(){
    console.log('Entrou na função de conexão');
    var db = new mongo.Db(
        'formlario',
        new mongo.Server(
            'localhost', // string contendo o endereço do servidor
            27017, // porta de conexão
            {}
        ),
        {}
    );

    return db;
}

module.exports = function(){
    return connMongoDB;
}