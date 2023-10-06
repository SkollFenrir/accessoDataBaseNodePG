const express = require('express');
const morgan = require('morgan-body');
const cors = require('cors');
const { getPosts, insertPost, deletePost, likePost } = require('./query');
const app = express();
const PORT = 3000;

morgan(app);
app.use(cors());
app.use(express.json());

app.get('/posts', async (rep, res) => {
	const post = await getPosts();
	res.json(post);
});
app.post('/posts', async (req, res) => {
	try {
		const post = req.body;
		const result = await insertPost(post);
		res.json(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.put('/posts/like/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await likePost(id);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.delete('/posts/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deletePost(id);
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.listen(PORT, console.log(`Servidor arriba en el puerto: ${PORT}`));
