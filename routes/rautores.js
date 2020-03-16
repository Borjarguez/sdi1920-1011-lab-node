module.exports = function (app, swig) {

    app.get('/autores', function (req, res) {
        var autores = [{
            "nombre": "Luis Fonsi",
            "grupo": "ninguno",
            "rol": "cantante"
        }, {
            "nombre": "Enrique Iglesias",
            "grupo": "ninguno",
            "rol": "cantante"
        }];

        let respuesta = swig.renderFile('views/autores.html', {
            vendedor: 'Tienda de canciones',
            autores: autores
        });

        res.send(respuesta);
    });

    app.get('/autores/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {});
        res.send(respuesta);
    });

    app.post("/autor", function (req, res) {
        let respuesta = "";
        if (req.query.nombre == null)
            respuesta = 'Nombre no enviado en la petición';
        else
            respuesta += 'Nombre: ' + req.query.nombre + '<br>';

        if (req.query.grupo == null)
            respuesta = "Grupo no enviado en la petición";
        else
            respuesta += 'Grupo: ' + req.query.grupo + '<br>';

        if (req.query.rol == null)
            respuesta = "Rol no enviado en la petición";
        else
            respuesta += 'Rol: ' + req.query.rol + '<br>';

        res.send(respuesta);
    });

    app.get('/autores/:id', function (req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });

    app.get('/autores*', function (req, res) {
        res.redirect('/autores');
    });
}