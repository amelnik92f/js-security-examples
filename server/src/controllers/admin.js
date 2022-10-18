const deleteCommentController = async (req, res, query) => {
  // update 
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Delete Comment" }));
}

module.exports = {
  deleteCommentController
}