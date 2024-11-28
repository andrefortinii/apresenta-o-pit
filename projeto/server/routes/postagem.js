const express = require('express');
const Posts = require('../models/posts');
const router = express.Router();


// Rota para listar post
router.get('/listar', async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
});

router.get('/listar/:id', async (req, res) => {
  const posts = await Posts.findByPk(req.params.id)
  res.json(posts);
});

// rota para ver comentario
router.get('/comentarios/:postId', async (req,res)=>{
  const post = await Posts.findByPk(req.params.postId);
  res.json(post.comentario)

}
)

router.post('/addcomentario/:id', async (req, res) => {
  const { id } = req.params; // Adicione postId
  const {comentario } = req.body;
  const newComment = await Posts.update({ 
    comentario: comentario
   },{where:{id}});
  res.json(newComment);
});


// Rota para adicionar post
router.post('/adicionar', async (req, res) => {
  const { titulo, descricao, conteudo, comentario } = req.body;
  const newPosts = await Posts.create({ titulo, descricao, conteudo, comentario });
  res.json(newPosts);
});

// Rota para editar post
router.put('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, conteudo } = req.body;

  try {
    // Atualiza o post com os dados fornecidos
    const [updated] = await Posts.update(
      { titulo, descricao, conteudo },
      { where: { id } }
    );

    if (updated) {
      return res.json({ message: 'Post atualizado com sucesso' });
    } else {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao atualizar o post' });
  }
});


// Rota para editar post
/*router.put('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, conteudo, imagem } = req.body;
  await Posts.update({ titulo, descricao, conteudo, imagem }, { where: { id } });
  res.json({ message: 'Post atualizado com sucesso' });
});*/

// Rota para deletar post
router.delete('/excluir/:id', async (req, res) => {
  const { id } = req.params;
  await Posts.destroy({ where: { id } });
  res.json({ message: 'Post deletado com sucesso' });
});

module.exports =  router;