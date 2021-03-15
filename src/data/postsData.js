const database = require('../infra/database')
exports.getPosts = function () {
    return database.query('SELECT * FROM questionarios');
};

exports.getPost = function (id) {
    return database.oneOrNone('SELECT * FROM questionarios WHERE id_questionario = $1', [id]); 
};

exports.getPostByTitulo = function (titulo) {
    return database.oneOrNone('SELECT * FROM questionarios WHERE titulo = $1', [titulo]); 
};

exports.savePost = function (post) {
    return database.one('INSERT into questionarios (titulo, usuario) VALUES ($1, $2) RETURNING *', [post.titulo, post.usuario]);
};


exports.deletePost = function (id) {
    return database.none('DELETE from questionarios WHERE id_questionario = $1', [id]);
};

exports.updatePost = function (id, post) {
	return database.none('update questionarios set titulo = $1, usuario = $2 where id_questionario = $3', [post.titulo, post.usuario, id]);
};

