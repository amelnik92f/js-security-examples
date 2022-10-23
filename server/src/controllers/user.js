const { USER_TABLE } = require('../../constants');
const { getReqData } = require('../../utils');

const createUserController = async (req, res, query) => {
  try {
    const raw_data = await getReqData(req);
    const data = JSON.parse(raw_data);
    
    if (data.role) {
      res.writeHead(403);
      res.end(`Can't create user with role`);
    } else {
    // WHERE name='';SET FOREIGN_KEY_CHECKS=0; drop table user;'
    const checkExistingSQL = `SELECT * from ${USER_TABLE} WHERE name='${data.name}'`;
    let [result] = await query(checkExistingSQL);

    if (!result) {
      const sql = `INSERT INTO ${USER_TABLE}(name) VALUES('${data.name}');`;
      const { insertId } = await query(sql);
      const resultSql = `SELECT * from ${USER_TABLE} WHERE id=${insertId};`;
      [result] = await query(resultSql);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
    }

  } catch (error) {
    res.writeHead(500);
    res.end(`Internal Server Error while creating new User: ${error}`)
  }
}

const updateUserController = async (req, res, query) => {
  try {
    const raw_data = await getReqData(req);
    const data = JSON.parse(raw_data);

    if (data.role) {
      res.writeHead(403);
      res.end(`Can't update user's role`);
    }

    const checkExistingUserSQL = `SELECT * from ${USER_TABLE} WHERE id='${data.id}'`;
    const [user] = await query(checkExistingUserSQL);
    const updated = merge(user, data);
  
    const updateUserSQL = `UPDATE ${USER_TABLE}
    SET age = ${updated.age}, name = '${updated.name}'
    WHERE id = ${updated.id};`;
  
    await query(updateUserSQL);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updated));
  } catch(error) {
    res.writeHead(500);
    res.end(`Internal Server Error while updating User: ${error}`)
  }

}

// https://github.com/lodash/lodash/blob/2f79053d7bc7c9c9561a30dda202b3dcd2b72b90/.internal/baseMergeDeep.js
function merge(target, source) {
  for (const attr in source) {
    if (
      typeof target[attr] === "object" &&
      typeof source[attr] === "object"
    ) {
      merge(target[attr], source[attr])
    } else {
      target[attr] = source[attr]
    }
  }

  return target;
}

module.exports = {
  createUserController,
  updateUserController
}