module.exports.index = function(application, req, res){
    res.render('index', { validacao: {},number:0 });
}

module.exports.end = function(application, req, res){
    res.render('end');
}

module.exports.autenticar = function(application, req, res){

    let dadosForm = req.body;

    let erros = req.validationErrors();

    if(erros){
        res.render('index', { validacao: erros });
        return;
    }
    let connection = application.config.dbConnection;
    let FormularioDAO = new application.app.models.FormularioDAO(connection);

    FormularioDAO.autenticar(dadosForm,req,res);

}