// Move from util to sagas

import { all, takeEvery, put, call } from 'redux-saga/effects'
import fullName from 'utils/fullName'

// Action Names

export const ACTIONS = {
  SAGA_WRAPPER: fullName('sagaWrapper', 'SAGA_WRAPPER'),
  START_LOADING: fullName('app', 'START_LOADING'),
  STOP_LOADING: fullName('app', 'STOP_LOADING'),
  SET_ERROR: fullName('app', 'SET_ERROR')
}

export const defaultOptions = {
  // This function is called with the arguments and decides if the loading actions are triggered
  loading: () => true,
  // This function is called with the caughtError and decides if the error actions are triggered
  error: () => true,
  // This function is called with the caughtError and decides if the error is logged
  logError: () => true,
  // This function is called with the result and decides if the result is acceptable or not
  throwError: () => false,
  // This function is called with the result and caughtError and is executed before failAction is put
  onError: () => {},
  // This function is called with the result if no error was caught and is executed at the very end
  onSuccess: () => {},
  LOADING_ACTION_START: ACTIONS.START_LOADING,
  LOADING_ACTION_STOP: ACTIONS.STOP_LOADING,
  ERROR_ACTION: fullName('app', 'SET_ERROR')
}

export function* sagaWrapper(action) {
  let result
  let encounteredError = false

  const { saga, args, successAction, failAction, options } = action.payload
  const {
    loading,
    error,
    logError,
    throwError,
    onError,
    onSuccess,
    LOADING_ACTION_START,
    LOADING_ACTION_STOP,
    ERROR_ACTION
  } = Object.assign(defaultOptions, options)
  const _args = (args && Array.isArray(args)) || []

  if (loading(_args)) {
    yield put({
      type: LOADING_ACTION_START
    })
  }

  try {
    result = yield call(saga, ..._args)
    if (throwError(result)) {
      throw Error(`Saga result failed acceptance test: ${throwError}`)
    }
  } catch (caughtError) {
    encounteredError = caughtError
    if (logError(caughtError)) {
      console.error(caughtError)
    }
    if (error(caughtError)) {
      yield put({
        type: ERROR_ACTION,
        payload: caughtError.toString()
      })
    }
  }

  if (loading(_args)) {
    yield put({
      type: LOADING_ACTION_STOP
    })
  }

  if (encounteredError) {
    if (onError) {
      try {
        onError(result, encounteredError)
      } catch (onErrorError) {
        console.error(onErrorError)
      }
    }
    if (failAction) {
      yield put({
        type: failAction,
        payload: encounteredError
      })
    }
  } else if (successAction) {
    yield put({
      type: successAction,
      payload: result
    })
  }

  if (onSuccess && !encounteredError) {
    onSuccess(result)
  }
}

function* watchSagaWrapper() {
  const { SAGA_WRAPPER } = ACTIONS
  yield takeEvery(SAGA_WRAPPER, sagaWrapper)
}

export default function* rootSaga() {
  yield all([ watchSagaWrapper() ])
}
