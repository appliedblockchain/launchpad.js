// Move from util to sagas

import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import fullName from 'utils/fullName'

export const ACTIONS = {
  SAGA_WRAPPER: fullName('sagaWrapper', 'SAGA_WRAPPER')
}

export const generalOptions = {
  /*
    The saga wrapper will check of the given arguments are arrays or not and if they are not, it will treat them as an array of
    one
  */
  /*
    performPreWrapFunctions: [ (action, preWrapFunctionsArg) -> boolean ]
    performPreWrapFunctions is a list of functions called with the action and the corresponding preWrapFunctionsArg and decides if
    the pre wrap function is executed.

    For example, if performPreWrapFunctions is [ (action, preWrapFunctionsArg) => preWrapFunctionsArg === 1, () => false ],
    preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionsArgs is [ 1, 2 ], in this case,
    doSomething will be executed but doSomethingElse will not be.
  */
  performPreWrapFunctions: [],
  /*
    performPreWrapSagas: [ (action, preWrapSagaArgs) -> boolean ]
    performPreWrapSagas is a list of sagas called with the action and the corresponding preWrapSagaArg and decides if
    the pre wrap saga is executed.
  */
  performPreWrapSagas: [],
  /*
    preWrapFunctions: [ preWrapFunctionsArgs -> * ]
    preWrapFunctionsArgs is a list of functions that are executed before the wrapped saga is executed.
  */
  preWrapFunctions: [],
  /*
    preWrapSagas: [ preWrapSagaArgs -> * ]
    preWrapSagas is a list of sagas that are executed before the wrapped saga is executed.
  */
  preWrapSagas: [],
  /*
    preWrapFunctionsArgs: [ [], [], [] ]
    preWrapFunctionsArgs is a list of list of arguments. Each list corresponds to a preWrapFunction.

    For example, if preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionsArgs is [ 1, 2 ],
    doSomething will be called with 1 and doSomethingElse will be called with 2.
  */
  preWrapFunctionsArgs: [],
  /*
    preWrapSagaArgs: [ [], [], [] ]
    preWrapSagaArgs is a list of list of arguments. Each list corresponds to a preWrapSaga.

    For example, if preWrapSagas is [ *doSomething, *doSomethingElse ] and preWrapSagaArgs is [ 1, 2 ],
    internally, something like yield call(doSomething,1) and yield call(doSomethingElse, 2) will take place.
  */
  preWrapSagaArgs: [],
  /*
    putPreWrapFunctionResults: [ (action, preWrapFunctionArg, result) => true ]

    putPreWrapFunctionResults is a list of functions called with the action, corresponding preWrapFunctionArg and the result
    of that function. If the result of calling this function is true, the result of the preWrapFunction is put into redux.

    The assumption is the result of preWrapFunction is an action ( as in { type, payload } ). If it is, it is put, otherwise,
    preWrapFunctionArg will be checked for PUT_KEY. If it has, { type: PUT_KEY, payload: result } is put.

    If this does not either, either, nothing will be put.

    For example, if putPreWrapFunctionResults is [ () => true ], and the result of calling preWrapFunction(preWrapFunctionArg) is
    { type: SOME_TYPE, payload: 0 }, then that is put. Otherwise, if preWrapFunctionArg.PUT_TYPE exists,
    { type: preWrapFunctionArg.PUT_TYPE, payload: result } is put.
  */
  putPreWrapFunctionResults: [],
  /*
    putPreWrapFunctionResults: [ (action, putPreWrapSagaArg, result) => true ]

    Similar to putPreWrapFunctionResults, but for sagas.
  */
  putPreWrapSagaResults: [],
  /* The following options follow the same rules as the preWrap ones, except for errors */
  /* The error and parsed error is passed as well */
  performErrorFunctions: [],
  performErrorSagas: [],
  errorFunctions: [],
  errorSagas: [],
  errorFunctionArgs: [],
  errorSagaArgs: [],
  putErrorFunctionResults: [],
  putErrorSagaResults: [],
  /*
    logError: (action, error) => bool
    logError is called with the action and the error and decides if the error is logged or not.
  */
  logError: () => true,
  /*
    parseError: error => error
    parseError is called with the error and attempts to extract details for the error.

    For example, parseError could be something like error => error.status === 404 ? 'Resource not found' : 'Unknown Error'
 */
  parseError: error => error.toString(),
  logParsedError: () => false,
  /*
    customErrorMessage: string
    customErrorMessage can be used to log / display a pre determined message, if the nature of the saga if known in advance.
  */
  customErrorMessage: '',
  /* The following options follow the same rules as the preWrap ones, except for post wrap */
  /* The result of the given saga is passed as well */
  performPostWrapFunctions: [],
  performPostWrapSagas: [],
  postWrapFunctions: [],
  postWrapSagas: [],
  postWrapFunctionArgs: [],
  postWrapSagaArgs: [],
  putPostWrapFunctionResults: [],
  putPostWrapSagaResults: [],
  /* The following options follow the same rules as the postWrap ones, except for success / fail */
  performSuccessFunctions: [],
  performSuccessWrapSagas: [],
  successFunctions: [],
  successSagas: [],
  successFunctionArgs: [],
  successSagaArgs: [],
  putSuccessFunctionResults: [],
  putSuccessSagaResults: [],
  performFailFunctions: [],
  performFailWrapSagas: [],
  failFunctions: [],
  failSagas: [],
  failFunctionArgs: [],
  failSagaArgs: [],
  putFailFunctionResults: [],
  putFailSagaResults: []
}

export const defaultOptions = {
  performPreWrapFunctions: () => true,
  preWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: true }),
  putPreWrapFunctionResults: () => true,
  performErrorFunctions: () => true,
  errorFunctions: (...args) => setGlobalError(args[3]),
  putErrorFunctionResults: () => true,
  logError: () => false,
  performPostWrapFunctions: () => true,
  postWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: false }),
  putPostWrapFunctionResults: () => true,
  performFailFunctions: 
}

export function* sagaWrapper(action) {
  let result
  let encounteredError = false

  const { saga, options } = action.payload
  const {
    loading, error, logError, throwError, onError, onSuccess, customErrorMessage,
    LOADING_ACTION_START, LOADING_ACTION_STOP, ERROR_ACTION
  } = Object.assign({}, generalOptions, defaultOptions, options)
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
    let tokenError = false
    if (caughtError.response && caughtError.response.data) {
      const errors = caughtError.response.data.errors
      if (error && error.length > 0) {
        tokenError = errors[0].code.includes('token')
      }
    }
    if (tokenError) {
      yield put({
        type: ERROR_ACTION,
        payload: caughtError.response.data.errors[0].detail
      })
      const emailAddress = yield select(state => state.auth.emailAddress)
      yield call(delay, 500)
      yield put(changeUser())
      yield call(delay, 100)
      yield put(login({ emailAddress: emailAddress ? emailAddress.toLocaleLowerCase() : '', requestLoginEmail: true }))
    } else {
      encounteredError = caughtError
      if (logError(caughtError)) {
        console.error(caughtError)
      }
      if (error(caughtError)) {
        if (customErrorMessage) {
          yield put({
            type: ERROR_ACTION,
            payload: customErrorMessage
          })
        } else {
          let errorMessage
          let errorDetail = getErrorDetail(caughtError)
          let errorMeta = getErrorMeta(caughtError)
          let errorTitle = ''
          const errorParsed = getErrorParsed(caughtError)

          if (errorDetail === '') {
            if (errorParsed.errors && errorParsed.errors.length > 0) {
              errorDetail = errorParsed.errors[0].detail
            }
          }
          if (errorMeta === '') {
            if (
              errorMeta.errors && errorMeta.errors.length > 0 &&
              errorParsed.errors[0].meta && errorParsed.errors[0].meta.length > 0
            ) {
              errorMeta = errorParsed.errors[0].meta[0].message
            }
          }
          if (errorParsed.errors && errorParsed.errors.length > 0) {
            errorTitle = errorParsed.errors[0].title
          }

          errorMessage = `${errorTitle} ${errorDetail} ${errorMeta}`
          if (errorMessage.replace(/ /g, '') === '') {
            errorMessage = caughtError.toString()
          }

          yield put({
            type: ERROR_ACTION,
            payload: errorMessage
          })
        }
      }
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
        payload: failPayload || encounteredError
      })
    }
  } else if (successAction) {
    yield put({
      type: successAction,
      payload: successPayload || result
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
  yield all([
    watchSagaWrapper()
  ])
}