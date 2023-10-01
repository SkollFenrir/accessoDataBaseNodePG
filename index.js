const express = require('express');
const morgan = require('morgan-body');
const cors = require('cors');
const { getPosts, insertPost } = require('./query');
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
	const post = req.body;
	const result = await insertPost(post);
	res.json(result);
});

app.listen(PORT, console.log(`Servidor arriba en el puerto: ${PORT}`));
