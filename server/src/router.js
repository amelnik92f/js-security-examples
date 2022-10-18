const { getCommentsController, createCommentController } = require('./controllers/comment');
const { createUserController, updateUserController } = require('./controllers/user');
const { deleteCommentController } = require('./controllers/admin');
const { notFoundController } = require('./controllers/notFound');

const router = (path, method) => {
  if (path === '/api/users' && method === "POST") {
    return createUserController;
  } else if (path.match(/\/api\/users\/([0-9]+)/) && method === "PUT") {
    return updateUserController;
  } else if (path === '/api/comments' && method === "GET") {
    return getCommentsController;
  } else if (path === '/api/comments' && method === "POST") {
    return createCommentController;
  } else if (path.match(/\/api\/admin\/comments\/([0-9]+)/) && method === "DELETE") {
    return deleteCommentController;
  } else {
    return notFoundController;
  }
}

module.exports = { router };