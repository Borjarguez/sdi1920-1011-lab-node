module.exports = function (app, swig, gestorBD) {

    app.get('/favoritos/add/:cancion_id', function (req, res) {
        let criteria = {"_id": gestorBD.mongo.ObjectID(req.params.cancion_id)};
        let precioTotal = 0;

        if (req.session.usuario == null) {
            res.redirect('/identificarse');
        } else {
            gestorBD.obtenerCanciones(criteria, function (canciones) {
                if (canciones == null)
                    res.send('Error');
                else {
                    let cancion = {
                        name : canciones[0].name,
                        autor: canciones[0].autor,

                    };
                    req.session.favourites = [...cancion];
                    console.log("Cancion fav: " + canciones[0].name);
                    res.redirect('/favoritos');
                }
            });
        }
    });

    app.get('/favoritos', function (req, res) {
        let array = req.session.favourites;

        let respuesta = swig.renderFile('views/bfavoritos.html',
            {
                canciones: array
            });
        res.send(respuesta);
    });

    app.get('/favoritos/eliminar/:cancion_id', function (req, res) {
        let id = gestorBD.mongo.ObjectID(req.params.cancion_id);
        let arrayFavs = req.session.favourites;

        arrayFavs = arrayFavs.filter(x => x._id !== id);
        req.session.favourites = arrayFavs;
        res.send("Cancion eliminada de favoritos");
    });
}
;