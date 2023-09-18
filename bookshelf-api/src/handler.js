const { nanoid } = require('nanoid')
const books = require('./books')

const addNewBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    insertedAt,
    updatedAt
  }

  books.push(newBook)
  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
}

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  let result = books

  if (name) {
    result = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    )
  } else if (reading) {
    if (reading === '0') {
      result = books.filter((book) => book.reading === false)
    } else {
      result = books.filter((book) => book.reading === true)
    }
  } else if (finished) {
    if (finished === '0') {
      result = books.filter((book) => book.finished === false)
    } else {
      result = books.filter((book) => book.finished === true)
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: result.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      })
    }
  })
  response.code(200)
  return response
}

const getBookOnIDHandler = (request, h) => {
  const { id } = request.params

  const book = books.filter((book) => book.id === id)
  if (book.length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      book: book[0]
    }
  })
  response.code(200)
  return response
}

const editBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const { id } = request.params

  const bookIdx = books.findIndex((book) => book.id === id)
  if (bookIdx === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  books[bookIdx].name = name
  books[bookIdx].year = year
  books[bookIdx].author = author
  books[bookIdx].summary = summary
  books[bookIdx].publisher = publisher
  books[bookIdx].pageCount = pageCount
  books[bookIdx].readPage = readPage
  books[bookIdx].reading = reading
  books[bookIdx].updatedAt = new Date().toISOString()

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  })
  response.code(200)
  return response
}

const deleteBookHandler = (request, h) => {
  const { id } = request.params

  const bookIdx = books.findIndex((book) => book.id === id)
  if (bookIdx === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  books.splice(bookIdx, 1)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  })
  response.code(200)
  return response
}

module.exports = {
  addNewBookHandler,
  getAllBooksHandler,
  getBookOnIDHandler,
  editBookHandler,
  deleteBookHandler
}
