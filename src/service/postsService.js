const postsData = require('../data/postsData');

exports.getPosts = function () {
    return postsData.getPosts();
};

exports.getPost = async function (id) {
    const post = await postsData.getPost(id);
    if (!post) {
        throw new Error('Postagem não encontda!')
    }else {
        return post;
    }
}

exports.savePost = async function (post) {
    const existingPost = await postsData.getPostByTitulo(post.titulo);
    if (existingPost) throw new Error('Postagem existente');
    return postsData.savePost(post);
};

exports.deletePost = function (id) {
    return postsData.deletePost(id);
};

exports.updatePost = async function (id, post) {
    await exports.getPost(id);
    return postsData.updatePost(id, post);
};