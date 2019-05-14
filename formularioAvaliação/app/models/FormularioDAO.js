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
                    req.assert('nome',"usuário ja respondeu parte do formulario continue sua respostas até aqui foram salvas").notEmpty();
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

                var target = "id";
                var field = form.number;

                var obj = {};
                obj[field] = target;




                console.log("obj:",obj);

                let cont_number = form.number;
                console.log("formulario:",form);
                // let quest =  req.session._number;
                // switch(form.number) {
                    // case '1':
                        collection.update({_id:result[0]._id},{$set:{[form.number]:form, number:form.number}},{"upsert":true});
                        res.render('index', { validacao:{},form:{},number:parseInt(form.number)+1, _id:req.session.usuario});
                //         break;
                //     case '2':
                //         collection.update({_id:result[0]._id}, {$set:{frase1:form, number:form.number}});
                //         res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                //         break;
                //     case '3':
                //         collection.update({_id:result[0]._id}, {$set:{frase3:form, number:form.number}});
                //         res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                //         break;
                //     case '4':
                //         collection.update({_id:result[0]._id}, {$set:{frase4:form, number:form.number}});
                //         res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                //         break;
                //     case '5':
                //         collection.update({_id:result[0]._id}, {$set:{frase5:form, number:form.number}});
                //         res.render('index', { validacao:{},form:{form},number:parseInt(form.number)+1, _id:req.session.usuario });
                //         break;
                //     default:
                //         res.render('end');
                //         console.log("Formulario finalizado");
                //         break;
                // }

            });
        });
    });
}



module.exports = function(){
    return FormularioDAO;
}