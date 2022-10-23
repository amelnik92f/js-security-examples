const { connection, queryCreator } = require("./db/connection");
const { createServer } = require('./src/server');
const { DB_NAME, PORT } = require('./constants');

(async () => {
  // pollute
  // const targetStr = '{"__proto__":{"isAdmin":true}}';

  // const target1 = { age: "Database sanitization expert" };
  // const source2 = JSON.parse(targetStr);
  
  
  // function merge(target, source) {
  //   for (const attr in source) {
  //     if (
  //       typeof target[attr] === "object" &&
  //       typeof source[attr] === "object"
  //     ) {
  //       merge(target[attr], source[attr])
  //     } else {
  //       target[attr] = source[attr]
  //     }
  //   }
  
  //   return target;
  // }
  
  
  // merge(target1, source2);
  //pollute

  const dbConnection = await connection;
  dbConnection.query(`USE ${DB_NAME};`)

  const server = createServer(queryCreator(dbConnection));
  server.listen(process.env.port || PORT);
})()