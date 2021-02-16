const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionarioSchema = mongoose.Schema({
    titulo: {
        type: String, required: true
    },
    nome: {
        type: String, required: true 
    },
    data: {
        type: String,
        required: true
    }
});

mongoose.model('questionario', QuestionarioSchema )

var Questionario = mongoose.model('questionario')

// new Questionario({
//     titulo: "Titulo teste",
//     nome: "teste",
//     data: "2021-02-13"
// }).save().then(() => {
//     console.log('Usuario criado')
// }).catch((err) => {
//     console.log('Erro: '+err)
// })