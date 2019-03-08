'use strict'
const Joi = require('koa-joi-router').Joi
const koaRouter = require('koa-joi-router')
const { getHelloWorld, setHelloWorld } = require('./handlers/rootHandler')
const router = koaRouter()

const routes = [
  {
    method: 'get',
    path: '/',
    validate: {
      output: {
        200: {
          body: {
            message: Joi.string()
          }
        }
      }
    },
    handler: getHelloWorld
  },
  {
    method: 'post',
    path: '/',
    validate: {
      type: 'json',
      body: {
        message: Joi.string().required()
      }
    },
    handler: setHelloWorld
  }
]

router.route(routes)

module.exports = router
