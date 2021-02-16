const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/questionarioSchema');
const Questionario = mongoose.model('questionario');

//inicio
router.get('/', (req, res) => {
    res.render('index')
})

//listar
router.get('/edit', (req, res) => {
    Questionario.find().then((questionario) => {
        res.render('edit', {questionario: questionario.map(questionario => questionario.toJSON())})    
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar questinários, recarregue a página')
        res.redirect('/quest')
    });
   
})

router.get('/post', (req, res) => {
    res.render('post')
})


//incluir
router.post('/post/add', (req, res) => {

    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null ){
        erros.push({texto: "Título inválido"})
    }
    if(!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null ){
        erros.push({texto: "Usuário inválido"})
    }
    if(!req.body.data || typeof req.body.data == undefined || req.body.data == null ){
        erros.push({texto: "Data inválida"})
    }
    if(erros.length > 0){
        res.render('post', {erros: erros})
    }else {
        const novoQuestionario = {
            titulo: req.body.titulo,
            nome: req.body.usuario,
            data: req.body.data
        }
        
        new Questionario(novoQuestionario).save().then(() => {
            req.flash('success_msg', 'Questinario criado com sucesso!')
            res.redirect('/quest/edit')
            next()
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao cadastrar questinário, tente novamente!')
            res.redirect('/quest/edit')
            next()
        })
    }
})


router.get('/resp/:id', (req, res) => {
    Questionario.findOne({_id:req.params.id}).lean().then((questionario) => {
        res.render('responsequest', {questionario: questionario})
        console.log(questionario)
    }).catch((err) => {
        req.flash('error_msg', 'Questinário inexistente')
        console.log(err)
        res.redirect('/quest/edit')
    })
})

module.exports = router;