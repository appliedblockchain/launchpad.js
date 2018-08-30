import { sagaWrapper, defaultOptions, ACTIONS } from './index'
import { cloneableGenerator } from 'redux-saga/utils'

describe('store:sagaWrapper', () => {
  const payload = {
    saga: function* saga() {},
    success_action: 'SUCCESS',
    fail_action: 'FAIL'
  }

  const failPayload = {
    saga: function* saga() {},
    success_action: 'SUCCESS',
    fail_action: 'FAIL',
    options: {
      throwError: data => data === undefined
    }
  }

  describe('success flow', () => {
    it('triggers loading', () => {
      const gen = sagaWrapper({ payload })
      expect(gen.next().value.PUT.action.type).toEqual(defaultOptions.LOADING_ACTION_START)
    })

    it('runs the saga', () => {
      const gen = cloneableGenerator(sagaWrapper)({
        type: ACTIONS.SAGA_WRAPPER,
        payload
      })
      gen.next()
      expect(gen.next().value.CALL.fn).toEqual(payload.saga)
    })

    it('triggers stop loading', () => {
      const gen = cloneableGenerator(sagaWrapper)({
        type: ACTIONS.SAGA_WRAPPER,
        payload
      })
      gen.next()
      gen.next()
      expect(gen.next().value.PUT.action.type).toEqual(defaultOptions.LOADING_ACTION_STOP)
    })
  })

  describe('fail flow', () => {
    it('triggers loading', () => {
      const gen = sagaWrapper({ payload: failPayload })
      expect(gen.next().value.PUT.action.type).toEqual(defaultOptions.LOADING_ACTION_START)
    })

    it('runs the saga', () => {
      const gen = cloneableGenerator(sagaWrapper)({
        type: ACTIONS.SAGA_WRAPPER,
        payload: failPayload
      })
      gen.next()
      expect(gen.next().value.CALL.fn).toEqual(failPayload.saga)
    })

    /* Important! This will log a error. This is to be expected! This tests that a error occurs */
    it('triggers the error action', () => {
      const gen = cloneableGenerator(sagaWrapper)({
        type: ACTIONS.SAGA_WRAPPER,
        payload: failPayload
      })
      gen.next()
      gen.next()
      expect(gen.next().value.PUT.action.type).toEqual(defaultOptions.ERROR_ACTION)
    })

    it('triggers stop loading', () => {
      const gen = cloneableGenerator(sagaWrapper)({
        type: ACTIONS.SAGA_WRAPPER,
        payload: failPayload
      })
      gen.next()
      gen.next()
      gen.next()
      expect(gen.next().value.PUT.action.type).toEqual(defaultOptions.LOADING_ACTION_STOP)
    })
  })
})
