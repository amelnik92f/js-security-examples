const { connection, queryCreator } = require("./db/connection");
const { createServer } = require('./src/server');
const { DB_NAME, PORT } = require('./constants');

(async () => {
  const dbConnection = await connection;
  dbConnection.query(`USE ${DB_NAME};`)

  const server = createServer(queryCreator(dbConnection));
  server.listen(process.env.port || PORT);
})()