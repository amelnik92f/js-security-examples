const { createConnection } = require('mysql');

const connection = new Promise((resolve, reject)=>{
  const dbConnection = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
});

  dbConnection.connect((err) => {
    if (err) {
      console.log("Error occurred", err);
      reject(err);
    } else {
      console.log("Connected to MySQL Server");
      resolve(dbConnection);
    }
  });
})

const queryCreator = (connection) => (sql) => {
  return new Promise((res, rej) => {
    connection.query(sql, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    })
  })
} 

module.exports = { connection, queryCreator }




