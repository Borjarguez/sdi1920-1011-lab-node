module.exports = function (app, swig, gestorBD) {

    app.post('/comentarios/:cancion_id', function (req, res) {
        let cancion_id = gestorBD.mongo.ObjectID(req.params.cancion_id);
        let usuario = req.session.usuario;

        let comentario = {
            autor: usuario,
            text: req.body.comentario,
            cancion_id: cancion_id
        };

        if (usuario != null) {
            gestorBD.insertarComentario(comentario, function (comentario) {
                if (comentario == null) {
                    res.send("Error al insertar el comentario");
                } else {
                    res.redirect('/publicaciones');
                }
            });
        } else {
            res.redirect('/identificarse');
        }
    });

    app.get('/comentario/borrar/:id', function (req, res) {
        let criteria = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        let currentUser = req.session.usuario;

        gestorBD.obtenerComentarios(criteria, function (comentarios) {
            if (comentarios[0].autor.localeCompare(currentUser) !== 0) {
                res.send('Ese comentario no te pertenece');
            } else {
                gestorBD.borrarComentario(criteria, function (comentarios) {
                    if (comentarios == null)
                        res.send('Error al eliminar comentario');
                    else {
                        res.send('Comentario eliminado');
                    }
                })
            }
        });
    });

};