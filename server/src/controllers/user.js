const createUserController = async (req, res, query) => {
  // query();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Create User" }));
}

const updateUserController = async (req, res, query) => {
  // update 
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Update User" }));
}

module.exports = {
  createUserController,
  updateUserController
}