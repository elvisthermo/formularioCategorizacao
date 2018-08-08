module.exports.home = function(application, req, res){
    res.render('home');
}
module.exports.formulario = function(application, req, res){
    res.render('index', { validacao: {},number:0 });
}
