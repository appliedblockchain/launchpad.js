'use strict'

const koaRouter = require('koa-joi-router')
const router = koaRouter()
const Joi = koaRouter.joi

const {
  addNote,
  getNote,
  getNotes,
  getNotesContract,
  searchNotes
} = require('./handlers')

const routes = [
  {
    method: 'post',
    validate: {
      type: 'json',
      output: {
        200: {
          body: {
            message: Joi.string()
          }
        }
      }
    },
    path: '/notes',
    handler: addNote
  },
  {
    method: 'get',
    path: '/notes/:id',
    validate: {
      output: {
        200: {
          body: Joi.object()
        }
      }
    },
    handler: getNote
  },
  {
    method: 'get',
    path: '/notes',
    validate: {
      output: {
        200: {
          body: Joi.object()
        }
      }
    },
    handler: getNotes
  },
  {
    method: 'get',
    path: '/notesCountract',
    validate: {
      output: {}
    },
    handler: getNotesContract
  },
  {
    method: 'get',
    path: '/notes/search',
    validate: {
      query: {
        query: Joi.string().required(),
        sig: Joi.string().required(),
        offset: Joi.number().default(0)
      },
      output: {
        200: {
          body: Joi.object()
        }
      }
    },
    handler: searchNotes
  }
]

router.route(routes)

module.exports = router
