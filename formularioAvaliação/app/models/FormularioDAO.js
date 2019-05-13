function FormularioDAO(connection) {
    this._connection = connection();
}

FormularioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err,mongoclient){
        mongoclient.collection("usuarios",function(err,collection){
            console.log("cadastrou usuario");
            collection.insert(usuario);
        });
    });
}


FormularioDAO.prototype.autenticar = function(usuario,dadosForm,req,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                console.log("autentificando usuario");
                console.log(result);
                if(result[0] != undefined){
                    //console.log("variave de sesssão");
                    req.session.autorizado = true;
                    req.session.usuario = result[0]._id;
                    req.session.number = result[0].number;
                }
                if(req.session.number > 0 && dadosForm.number ==0){
                    req.assert('nome',"usuário ja respondeu parte do formulario continue sua respostas até aqui forma salvas").notEmpty();
                    let erros = req.validationErrors();
                    res.render('index', { validacao:erros, dadosForm: result,number:req.session.number, _id:req.session.usuario});
                }else if(req.session.autorizado){
                    console.log("usuario autenticado");
                    res.render('index', { validacao:{},dadosForm: result,number:1, _id:req.session.usuario});
                }else{
                    res.send("erro na autentificação!");
                }
            });
            mongoclient.close();
        });
    });
}

FormularioDAO.prototype.cadatrarQuest = function(usuario,form,req,res){
    this._connection.open(function(err,mongoclient){
        mongoclient.collection("usuarios",function(err,collection){
            collection.find(usuario).toArray(function (err,result) {
                if(result[0] != undefined) {
                    req.session.autorizado = true;
                    req.session._id = result[0]._id;
                    req.session._number = result[0].number;
                }
                let quest =  req.session._number;
                switch(form.number) {
                    case '1':
                        req.assert('quest1', 'A questão deve ser respondida').notEmpty();
                        collection.update({_id:result[0]._id}, {$set:{frase0:form.frase0, tipo0:form.tipo0,subtipo0:form.subtipo0, number:form.number}});
                        res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario});
                        break;
                    case '2':
                        collection.update({_id:result[0]._id}, {$set:{frase1:form.frase1, tipo1:form.tipo1,subtipo1:form.subtipo1, number:form.number}});
                        res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                        break;
                    case '3':
                        collection.update({_id:result[0]._id}, {$set:{frase2:form.frase2, tipo2:form.tipo2,subtipo2:form.subtipo2, number:form.number}});
                        res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                        break;
                    case '4':
                        collection.update({_id:result[0]._id}, {$set:{frase3:form.frase3, tipo3:form.tipo3,subtipo3:form.subtipo3,number:form.number}});
                        res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                        break;
                    case '5':
                        collection.update({_id:result[0]._id}, {$set:{frase4:form.frase4, tipo4:form.tipo4,subtipo4:form.subtipo4, number:form.number}});
                        res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });

                        break;
                    default:
                        res.render('end');
                        console.log("Formulario finalizado");
                        break;
                }

            });
        });
    });
}



module.exports = function(){
    return FormularioDAO;
}