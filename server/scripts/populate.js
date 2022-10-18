const { connection } = require("../db/connection");
const { DB_NAME, USER_TABLE, COMMENT_TABLE } = require("../constants");

const FLAGS = `SET FOREIGN_KEY_CHECKS=0;`;
const DB_QUERY = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}; USE ${DB_NAME};`
const USE_DB_QUERY = `USE ${DB_NAME};`
const USER_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${USER_TABLE}(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
role ENUM('admin','user') DEFAULT 'user',
age INT
);`

const COMMENT_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${COMMENT_TABLE}(
id INT AUTO_INCREMENT PRIMARY KEY,
text TEXT(1000) NOT NULL,
user_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES ${USER_TABLE}(id) ON DELETE CASCADE
);`

const FAKE_USERS = ['Alex', 'Peter', 'Amy', 'Hannah', 'Michael', 'Sandy', 'Betty', 'Richard', 'Susan', 'Vicky', 'Ben', 'William', 'Chuck', 'Viola'];

const FAKE_USERS_QUERY = FAKE_USERS.map((user, idx) => `('${user}', '${idx === 0 ? 'admin' : 'user'}')`).join(',');

const FAKE_COMMENTS = [ 'Wow!', 'Awesone!', 'Not too bad', 'Exciting!', 'Wonderfull!', 'Glorious!', 'Amazing!', 'Fantastic!', 'Fabulous!', 'Good!', 'Lovely', 'Incredible', 'Soo cute!', 'Sweet!'];

const FAKE_COMMENTS_QUERY = FAKE_COMMENTS.map((comment, idx) => `('${comment}', ${idx + 1})`).join(',');

const INSERT_USERS_QUERY = `INSERT INTO ${USER_TABLE}(name,role) VALUES${FAKE_USERS_QUERY};`;

const INSERT_COMMENTS_QUERY = `INSERT INTO ${COMMENT_TABLE}(text,user_id) VALUES${FAKE_COMMENTS_QUERY};`;

const populate = (connection) => {
  connection.query(`
  ${FLAGS}
  ${DB_QUERY}
  ${USE_DB_QUERY}
  ${USER_TABLE_QUERY}
  ${COMMENT_TABLE_QUERY}
  ${INSERT_USERS_QUERY}
  ${INSERT_COMMENTS_QUERY}
  `, (err) => {
    if (err) {
      console.error(`Error: ${err}`)
      process.exit(1);
    }
    
    console.log('Population has been completed');
    process.exit(0);
  });


}


connection.then(populate);