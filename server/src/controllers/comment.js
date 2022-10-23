const { COMMENT_TABLE, USER_TABLE } = require("../../constants");
const { getReqData } = require('../../utils');

const createCommentController = async (req, res, query) => {
  try {
    const raw_data = await getReqData(req);
    const { text, user_id } = JSON.parse(raw_data);
    const sql = `INSERT INTO ${COMMENT_TABLE}(text,user_id) VALUES('${text}',${user_id});`;
    const { insertId } = await query(sql);
    const checkExistingSQL = `SELECT Comment.id, Comment.text, User.name as 'user' from ${COMMENT_TABLE} INNER JOIN ${USER_TABLE} ON Comment.user_id=User.id WHERE Comment.id=${insertId};`;
    const [result] = await query(checkExistingSQL);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500);
    res.end(`Internal Server Error while creating new Comment: ${error}`)
  }
}

const getCommentsController = async (req, res, query, queryParamsData) => {
  const checkExistingSQL = `SELECT Comment.id, Comment.text, User.name as 'user' from ${COMMENT_TABLE} INNER JOIN ${USER_TABLE} ON Comment.user_id=User.id;`;

  let result = await query(checkExistingSQL);
  if (queryParamsData.length > 0) {
    const textParam = queryParamsData[0][1];
    // ^(a+)+$
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!
    const regex = new RegExp(textParam);
    result = result.filter(comment => regex.test(comment.text));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

module.exports = {
  createCommentController,
  getCommentsController
}