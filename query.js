const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'postgres',
	database: 'likesme',
	allowExitOnIdle: true,
});

const getPosts = async () => {
	const result = await pool.query('select * from posts');
	return result.rows;
};

const insertPost = async (post) => {
	const values = Object.values(post);
	const consult = 'insert into posts values (default, $1, $2, $3, default)';
	const result = await pool.query(consult, values);
	return result;
};

module.exports = { getPosts, insertPost };
