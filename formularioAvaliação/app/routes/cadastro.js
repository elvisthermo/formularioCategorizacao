module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastro.cadastro(application, req, res);
	});
	application.post('/cadastrar', function(req, res){
		application.app.controllers.cadastro.autenticar(application, req, res);
	});

    application.post('/cadastrarQuests', function(req, res){
        application.app.controllers.cadastro.cadatrarQuest(application, req, res);
    });

}