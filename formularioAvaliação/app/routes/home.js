module.exports = function(application){
    application.get('/home', function(req, res){
        application.app.controllers.home.home(application, req, res);
    });

    application.get('/formulario', function(req, res){
        application.app.controllers.home.formulario(application, req, res);
    });



}