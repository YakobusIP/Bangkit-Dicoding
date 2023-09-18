const {
  addNewBookHandler,
  getBookOnIDHandler,
  editBookHandler,
  deleteBookHandler,
  getAllBooksHandler
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookOnIDHandler
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookHandler
  }
]

module.exports = routes
