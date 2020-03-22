// Módulos
let express = require('express');
let app = express();

let fileUpload = require('express-fileupload');
app.use(fileUpload());

let mongo = require('mongodb');
let swig = require('swig');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);

app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db', 'mongodb+srv://admin:sdi@tiendamusica-divfp.mongodb.net/test?retryWrites=true&w=majority')

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, mongo); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, mongo); // (app, param1, param2, etc.)
//require("./routes/rautores.js")(app, swig); // (app, param1, param2, etc.)

// Lanzar el servidor
app.listen(app.get('port'), function () {
   console.log("Servidor activo");
});