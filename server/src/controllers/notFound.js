const notFoundController = async (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `Route not found for ${req.url}` }));
};

module.exports = {notFoundController};