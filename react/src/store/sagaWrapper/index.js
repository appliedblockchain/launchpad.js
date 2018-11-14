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
    useDefaultOptions: bool
    useDefaultOptions is a boolean that decides if the default options, specific to each application, should be used. If set to
    true, general defaults will be overridden
  */
  useDefaultOptions: true,
  /*
    performPreWrapFunctions: [ (action, preWrapFunctionsArg) -> boolean ]
    performPreWrapFunctions is a list of functions called with the action and the corresponding preWrapFunctionsArg and decides if
    the pre wrap function is executed.

    For example, if performPreWrapFunctions is [ (action, preWrapFunctionsArg) => preWrapFunctionsArg === 1, () => false ],
    preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionArgs is [ 1, 2 ], in this case,
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
    preWrapFunctions: [ (action, preWrapFunctionArgs) -> * ]
    preWrapFunctionArgs is a list of functions that are executed before the wrapped saga is executed.
  */
  preWrapFunctions: [],
  /*
    preWrapSagas: [ (action, preWrapSagaArgs) -> * ]
    preWrapSagas is a list of sagas that are executed before the wrapped saga is executed.
  */
  preWrapSagas: [],
  /*
    preWrapFunctionArgs: [ [], [], [] ]
    preWrapFunctionArgs is a list of list of arguments. Each list corresponds to a preWrapFunction.

    For example, if preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionsArgs is [ 1, 2 ],
    doSomething will be called with 1 and doSomethingElse will be called with 2.
  */
  preWrapFunctionArgs: [],
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
  /* The result of the given saga or error is passed as well */
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
  performSuccessSagas: [],
  successFunctions: [],
  successSagas: [],
  successFunctionArgs: [],
  successSagaArgs: [],
  putSuccessFunctionResults: [],
  putSuccessSagaResults: [],
  performFailFunctions: [],
  performFailSagas: [],
  failFunctions: [],
  failSagas: [],
  failFunctionArgs: [],
  failSagaArgs: [],
  putFailFunctionResults: [],
  putFailSagaResults: []
}

export const sagaWrapper = () => {}

export function* _sagaWrapper(action) {
  let sagaResult

  const { saga, options } = action.payload
  const baseOptions = options.useDefaultOptions ? Object.assign({}, generalOptions, options.defaultOptions) : generalOptions
  const {
    performPreWrapFunctions, performPreWrapSagas,
    preWrapFunctions, preWrapSagas,
    preWrapFunctionArgs, preWrapSagaArgs,
    putPreWrapFunctionResults, putPreWrapSagaResults,
    performErrorFunctions, performErrorSagas,
    errorFunctions, errorSagas,
    errorFunctionArgs, errorSagaArgs,
    putErrorFunctionResults, putErrorSagaResults,
    performPostWrapFunctions, performPostWrapSagas,
    postWrapFunctions, postWrapSagas,
    postWrapFunctionArgs, postWrapSagaArgs,
    putPostWrapFunctionResults, putPostWrapSagaResults,
    performSuccessFunctions, performSuccessSagas,
    successFunctions, successSagas,
    successFunctionArgs, successSagaArgs,
    putSuccessFunctionResults, putSuccessSagaResults,
    performFailFunctions, performFailSagas,
    failFunctions, failSagas,
    failFunctionArgs, failSagaArgs,
    putFailFunctionResults, putFailSagaResults,
    logError, logParsedError, parseError, customErrorMessage
  } = Object.assign({}, baseOptions, options)

  /* ToDo: Add length check */

  /* Pre Wrap Functions */
  const _performPreWrapFunctions = Array.isArray(performPreWrapFunctions) ? performPreWrapFunctions : [ performPreWrapFunctions ]
  const _preWrapFunctions = Array.isArray(preWrapFunctions) ? preWrapFunctions : [ preWrapFunctions ]
  const _preWrapFunctionArgs = Array.isArray(preWrapFunctionArgs) ? preWrapFunctionArgs : [ preWrapFunctionArgs ]
  const _putPreWrapFunctionResults = Array.isArray(putPreWrapFunctionResults) ? putPreWrapFunctionResults : [ putPreWrapFunctionResults ]

  for (let index = 0; index < _preWrapFunctions.length; index++) {
    const correspondingPerformCheck = _performPreWrapFunctions[index]
    const preWrapFunction = _preWrapFunctions[index]
    const correspondingArgument = _preWrapFunctionArgs[index]
    const correspondingPutCheck = _putPreWrapFunctionResults[index]
    if (correspondingPerformCheck(action, correspondingArgument)) {
      const result = preWrapFunction(action, correspondingArgument)
      if (correspondingPutCheck(action, correspondingArgument, result)) {
        if (result && result.type) {
          yield put(result)
        } else if (correspondingArgument.PUT_TYPE) {
          yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
        }
      }
    }
  }

  /* Pre Wrap Sagas */
  const _performPreWrapSagas = Array.isArray(performPreWrapSagas) ? performPreWrapSagas : [ performPreWrapSagas ]
  const _preWrapSagas = Array.isArray(preWrapSagas) ? preWrapSagas : [ preWrapSagas ]
  const _preWrapSagaArgs = Array.isArray(preWrapSagaArgs) ? preWrapSagaArgs : [ preWrapSagaArgs ]
  const _putPreWrapSagaResults = Array.isArray(putPreWrapSagaResults) ? putPreWrapSagaResults : [ putPreWrapSagaResults ]

  for (let index = 0; index < _preWrapSagas.length; index++) {
    const correspondingPerformCheck = _performPreWrapSagas[index]
    const preWrapSaga = _preWrapSagas[index]
    const correspondingArgument = _preWrapSagaArgs[index]
    const correspondingPutCheck = _putPreWrapSagaResults[index]
    if (correspondingPerformCheck(action, correspondingArgument)) {
      const result = yield call(preWrapSaga, action, correspondingArgument)
      if (correspondingPutCheck(action, correspondingArgument, result)) {
        if (result && result.type) {
          yield put(result)
        } else if (correspondingArgument.PUT_TYPE) {
          yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
        }
      }
    }
  }

  try {
    // Attempot to run the saga
    sagaResult = yield call(saga)
  } catch (error) {
    // Handle error logging
    if (logError(action, error)) {
      console.error(error)
    }
    const parsedError = parseError(error)
    if (logParsedError(action, parsedError)) {
      console.error(parsedError)
    }
    // Handle error actions
    const _performErrorFunctions = Array.isArray(performErrorFunctions) ? performErrorFunctions : [ performErrorFunctions ]
    const _errorFunctions = Array.isArray(errorFunctions) ? errorFunctions : [ errorFunctions ]
    const _errorFunctionArgs = Array.isArray(errorFunctionArgs) ? errorFunctionArgs : [ errorFunctionArgs ]
    const _putErrorFunctionResults = Array.isArray(putErrorFunctionResults) ? putErrorFunctionResults : [ putErrorFunctionResults ]

    for (let index = 0; index < _errorFunctions.length; index++) {
      const correspondingPerformCheck = _performErrorFunctions[index]
      const errroFunction = _errorFunctions[index]
      const correspondingArgument = _errorFunctionArgs[index]
      const correspondingPutCheck = _putErrorFunctionResults[index]
      if (correspondingPerformCheck(action, correspondingArgument, { error, parsedError })) {
        const result = errroFunction(action, correspondingArgument, { error, parsedError })
        if (correspondingPutCheck(action, correspondingArgument, result, { error, parsedError })) {
          if (result && result.type) {
            yield put(result)
          } else if (correspondingArgument.PUT_TYPE) {
            yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
          }
        }
      }
    }

    const _performErrorSagas = Array.isArray(performErrorSagas) ? performErrorSagas : [ performErrorSagas ]
    const _errorSagas = Array.isArray(errorSagas) ? errorSagas : [ errorSagas ]
    const _errorSagaArgs = Array.isArray(errorSagaArgs) ? errorSagaArgs : [ errorSagaArgs ]
    const _putErrorSagaResults = Array.isArray(putErrorSagaResults) ? putErrorSagaResults : [ putErrorSagaResults ]

    for (let index = 0; index < _errorSagas.length; index++) {
      const correspondingPerformCheck = _performErrorSagas[index]
      const errorSaga = _errorSagas[index]
      const correspondingArgument = _errorSagaArgs[index]
      const correspondingPutCheck = _putErrorSagaResults[index]
      if (correspondingPerformCheck(action, correspondingArgument, { error, parsedError })) {
        const result = yield call(errorSaga, action, correspondingArgument, { error, parsedError })
        if (correspondingPutCheck(action, correspondingArgument, result, { error, parsedError })) {
          if (result && result.type) {
            yield put(result)
          } else if (correspondingArgument.PUT_TYPE) {
            yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
          }
        }
      }
    }
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
