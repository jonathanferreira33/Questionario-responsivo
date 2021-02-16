const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const quest = require('./routes/quest');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//config
app.use(session({
    secret: 'QuestonarioResponsivo',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());

//middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/db_perguntas", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() =>{
            console.log("Conectado com sucesso!")
        }).catch((err) =>{
            mongoose.Promise = global.Promise;
            console.log("Erro ao conectar: " + err)
        }) 
    //public
app.use(express.static(path.join(__dirname, 'public')))



//routes
app.use('/quest', quest)

const port = 8081;
app.listen(port, () => {
    console.log('Servidor online')
})

