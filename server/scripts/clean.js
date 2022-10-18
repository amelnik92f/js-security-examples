const { connection } = require("../db/connection");
const { DB_NAME } = require("../constants");

const DB_QUERY = `DROP DATABASE ${DB_NAME};`

const clean = (connection) => {
  connection.query(`
  ${DB_QUERY}
  `, (err) => {
    if (err) {
      console.error(`Error: ${err}`)
      process.exit(1);
    }
    
    console.log(`Database ${DB_NAME} has been deleted`);
    process.exit(0);
  });
}


connection.then(clean);