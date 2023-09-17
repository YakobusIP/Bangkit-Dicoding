const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal untuk ditambahkan'
  })
  response.code(500)
  return response
}

const getNoteHandler = (request, h) => {
  const { id } = request.params

  if (id) {
    const note = notes.filter((note) => note.id === id)
    if (note.length === 0) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
      })
      response.code(404)
      return response
    }

    const response = h.response({
      status: 'success',
      data: {
        note: note[0]
      }
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'success',
      data: {
        notes
      }
    })
    response.code(200)
    return response
  }
}

const editNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const { id } = request.params

  const noteIdx = notes.findIndex((note) => note.id === id)
  if (noteIdx === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan'
    })
    response.code(404)
    return response
  }

  notes[noteIdx].title = title
  notes[noteIdx].tags = tags
  notes[noteIdx].body = body
  notes[noteIdx].updatedAt = new Date().toISOString()

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbaharui'
  })
  response.code(200)
  return response
}

const deleteNoteHandler = (request, h) => {
  const { id } = request.params

  const noteIdx = notes.findIndex((note) => note.id === id)
  if (noteIdx === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id catatan tidak ditemukan'
    })
    response.code(404)
    return response
  }

  notes.splice(noteIdx, 1)
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus'
  })
  response.code(200)
  return response
}

module.exports = {
  addNoteHandler,
  getNoteHandler,
  editNoteHandler,
  deleteNoteHandler
}
