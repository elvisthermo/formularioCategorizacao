module.exports.cadastro = function(application, req, res){
    res.render('cadastro', { validacao: {}, dadosForm: {} ,number:1});
}

module.exports.cadastrar = function(application, req, res){
    let dadosForm = req.body;
    console.log(dadosForm);
    //req.assert('quest1', 'A questão deve ser respondida').notEmpty();
    let erros = req.validationErrors();

    if(erros){
        res.render('index', { validacao: erros, dadosForm: dadosForm,number:0 });
        return;
    }
    let connection = application.config.dbConnection;
    let FormularioDAO = new application.app.models.FormularioDAO(connection);
    FormularioDAO.inserirUsuario(dadosForm);

    //res.render('index', { validacao: erros, dadosForm: dadosForm,number:dadosForm.number+1 });
    //let number = req.session.number;
    // var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    // var JogoDAO = new application.app.models.JogoDAO(connection);

    // UsuariosDAO.inserirUsuario(dadosForm);
    // JogoDAO.gerarParametros(dadosForm.usuario);
    //
    // res.send('podemos cadastrar');
}

module.exports.autenticar = function(application,req, res){
    let dadosForm = req.body;
    console.log("passo:"+dadosForm.number);
    let id = dadosForm._id;

    let connection = application.config.dbConnection;
    let FormularioDAO = new application.app.models.FormularioDAO(connection);
    FormularioDAO.inserirUsuario(dadosForm);


    req.assert('_id','Email invalido').isEmail();
    //req.assert('quest1', 'A questão deve ser respondida').notEmpty();
    let erros = req.validationErrors();

    if(erros){
        res.render('index', { validacao: erros, dadosForm: dadosForm,number:0 });
        return;
    }

    let connection2 = application.config.dbConnection;
    let FormularioDAO2 = new application.app.models.FormularioDAO(connection2);
    FormularioDAO2.autenticar({_id:dadosForm._id},dadosForm,req,res);
}

module.exports.cadatrarQuest = function(application, req, res){
    console.log(req.body);
    let dadosForm = req.body;
    console.log("formulario"+dadosForm);

    //console.log("passo:"+dadosForm.number);
    let connection = application.config.dbConnection;
    let FormularioDAO = new application.app.models.FormularioDAO(connection);
    console.log("id:"+ dadosForm._id);
    console.log("1-numero:"+dadosForm.number);
    console.log("resposta quest:"+dadosForm.quest1);
    console.log(dadosForm);
    FormularioDAO.cadatrarQuest({_id:dadosForm._id},dadosForm,req,res);
    //console.log("id:"+_id);


    // if(req.session.autorizado){
    //     FormularioDAO.cadatrarQuest(req.session.usuario,dadosForm,req,res);
    // }else{
    //     FormularioDAO.cadatrarQuest({_id:dadosForm._id},dadosForm,req,res);
    //
    // }
}