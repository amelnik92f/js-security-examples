const { COMMENT_TABLE, USER_TABLE } = require("../../constants");
const { getReqData } = require('../../utils');

const deleteCommentController = async (req, res, query) => {
    try {
      const raw_data = await getReqData(req);
      const { user_id, id } = JSON.parse(raw_data);
      const userSQL = `SELECT * from ${USER_TABLE} WHERE id='${user_id}'`;
      const [user] = await query(userSQL);
      const userWithPermissions = assignPermissions(user);


      if (userWithPermissions.isAdmin) {
        const sql = `DELETE FROM ${COMMENT_TABLE} WHERE id='${id}';`;
        await query(sql);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({id}));
      } else {
        res.writeHead(403);
        res.end(`Don't have enough permissions to delete comments`)
      }

    } catch (error) {
      res.writeHead(500);
      res.end(`Internal Server Error while creating new Comment: ${error}`)
    }
}


function assignPermissions(user){

  if (user.role === "admin") {
    user.isAdmin = true
  }

  return user;
}


module.exports = {
  deleteCommentController
}