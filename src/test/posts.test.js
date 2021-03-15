const crypto = require('crypto');
const axios = require('axios');
const postsService = require('../service/postsService');

const generate = function () {
    return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
    return axios({ url, method, data, validateStatus: false });

};

test('Obter postagens', async function () {
    //given
    const post1 = await postsService.savePost({ titulo: generate(), usuario: generate() });
    const post2 = await postsService.savePost({ titulo: generate(), usuario: generate() });
    const post3 = await postsService.savePost({ titulo: generate(), usuario: generate() });
    
    
   //when
    const response = await request('http://localhost:3001/posts', 'get');
    expect(response.status).toBe(200);
    const posts = response.data;

    //then
    expect(posts).toHaveLength(3);
    await postsService.deletePost(post1.id_questionario);
    await postsService.deletePost(post2.id_questionario);
    await postsService.deletePost(post3.id_questionario);
});



test.only('Problema ao Criar postagens', async function () {
    const data = { titulo: generate(), usuario: generate() };
    const response1 = await request('http://localhost:3001/posts', 'post',  data);
    const response2 = await request('http://localhost:3001/posts', 'post',  data);
    expect(response2.status).toBe(409);
    const post = response1.data;
    await postsService.deletePost(post.id_questionario);
});

test('Criar postagens', async function () {
    const data = { titulo: generate(), usuario: generate() };
    const response = await request('http://localhost:3001/posts', 'post',  data);
    expect(response.status).toBe(201);
    const post = response.data;
    expect(post.titulo).toBe(data.titulo);
    expect(post.usuario).toBe(data.usuario);
    await postsService.deletePost(post.id_questionario);
});


test('Atualizar postagens', async function () {
    const post = await postsService.savePost({ titulo: generate(), usuario: generate() });
	post.titulo = generate();
	post.usuario = generate();
	const response = await request(`http://localhost:3001/posts/${post.id_questionario}`, 'put', post);
    expect(response.status).toBe(204);
	const updatedPost = await postsService.getPost(post.id_questionario);
	expect(updatedPost.titulo).toBe(post.titulo);
	expect(updatedPost.usuario).toBe(post.usuario);
	await postsService.deletePost(post.id_questionario);
});

test('Problema ao Atualizar postagens', async function () {
    const post = {
        id_questionario: 0
    };
	const response = await request(`http://localhost:3001/posts/${post.id_questionario}`, 'put', post);
    expect(response.status).toBe(404);
	
});


test("Deletar postagem", async function () {
    const post = await postsService.savePost({ titulo: generate(), usuario: generate()});
    const response = await request(`http://localhost:3001/posts/${post.id_questionario}`, 'delete');
    expect(response.status).toBe(204);
    const posts = await postsService.getPost();
    expect(posts).toHaveLength(0);

});