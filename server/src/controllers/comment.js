const createCommentController = async (req, res, query) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Create Comment" }));
}

const getCommentsController = async (req, res, query, queryParamsData) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Get Comments" }));
}

module.exports = {
  createCommentController,
  getCommentsController
}