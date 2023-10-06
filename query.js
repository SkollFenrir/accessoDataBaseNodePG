const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'postgres',
	database: 'likesme',
	allowExitOnIdle: true,
});

const getPosts = async () => {
	const result = await pool.query('SELECT * FROM posts;');
	return result.rows;
};

const insertPost = async (post) => {
	const values = Object.values(post);
	const consult = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, DEFAULT);'; // <====
	const result = await pool.query(consult, values);   // <====
	return result; // <====
};

const likePost = async (id) => {
	const result = await pool.query(
		'UPDATE posts SET likes = likes + 1 WHERE id = $1;',  // <====
		[id]
	);
	return result.rows;  // <====
};

const deletePost = async (id) => {
	const { rows } = await pool.query('DELETE FROM posts WHERE id = $1;', [id]); // <====
	return rows; // <====
};

//En las funciones insert, like y delete; se encuentran tres maneras de ingresar las querys

module.exports = { getPosts, insertPost , deletePost, likePost};
