import { all, takeEvery, put, call } from 'redux-saga/effects'
import _differenceWith from 'lodash/differenceWith'
import _isEqual from 'lodash/isEqual'
import fullName from 'utils/fullName'

export const ACTIONS = {
  SAGA_WRAPPER: fullName('sagaWrapper', 'SAGA_WRAPPER')
}

export const sagaWrapper = (saga, options = {}) => ({
  type: ACTIONS.SAGA_WRAPPER,
  payload: { saga, options }
})

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
    preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionArgs is [ 1, 2 ], in this case,
    doSomething will be executed but doSomethingElse will not be.
  */
  performPreWrapFunctions: [ () => false ],
  /*
    performPreWrapSagas: [ (action, preWrapSagaArgs) -> boolean ]
    performPreWrapSagas is a list of sagas called with the action and the corresponding preWrapSagaArg and decides if
    the pre wrap saga is executed.
  */
  performPreWrapSagas: [ () => false ],
  /*
    preWrapFunctions: [ (action, preWrapFunctionArgs) -> * ]
    preWrapFunctionArgs is a list of functions that are executed before the wrapped saga is executed.
  */
  preWrapFunctions: [ () => false ],
  /*
    preWrapSagas: [ (action, preWrapSagaArgs) -> * ]
    preWrapSagas is a list of sagas that are executed before the wrapped saga is executed.
  */
  preWrapSagas: [ () => false ],
  /*
    preWrapFunctionArgs: [ [], [], [] ]
    preWrapFunctionArgs is a list of list of arguments. Each list corresponds to a preWrapFunction.

    For example, if preWrapFunctions is [ doSomething, doSomethingElse ] and preWrapFunctionsArgs is [ 1, 2 ],
    doSomething will be called with 1 and doSomethingElse will be called with 2.
  */
  preWrapFunctionsArgs: [ {} ],
  /*
    preWrapSagaArgs: [ [], [], [] ]
    preWrapSagaArgs is a list of list of arguments. Each list corresponds to a preWrapSaga.

    For example, if preWrapSagas is [ *doSomething, *doSomethingElse ] and preWrapSagaArgs is [ 1, 2 ],
    internally, something like yield call(doSomething,1) and yield call(doSomethingElse, 2) will take place.
  */
  preWrapSagasArgs: [ {} ],
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
  putPreWrapFunctionsResults: [ () => false ],
  /*
    putPreWrapFunctionResults: [ (action, putPreWrapSagaArg, result) => true ]

    Similar to putPreWrapFunctionResults, but for sagas.
  */
  putPreWrapSagasResults: [ () => false ],
  /* The following options follow the same rules as the preWrap ones, except for errors */
  /* The error and parsed error is passed as well */
  performErrorFunctions: [ () => false ],
  performErrorSagas: [ () => false ],
  errorFunctions: [ () => false ],
  errorSagas: [ () => false ],
  errorFunctionsArgs: [ {} ],
  errorSagasArgs: [ {} ],
  putErrorFunctionsResults: [ () => false ],
  putErrorSagasResults: [ () => false ],
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
  performPostWrapFunctions: [ () => false ],
  performPostWrapSagas: [ () => false ],
  postWrapFunctions: [ () => false ],
  postWrapSagas: [ () => false ],
  postWrapFunctionsArgs: [ {} ],
  postWrapSagasArgs: [ {} ],
  putPostWrapFunctionsResults: [ () => false ],
  putPostWrapSagasResults: [ () => false ],
  /* The following options follow the same rules as the postWrap ones, except for success / fail */
  performSuccessFunctions: [ () => false ],
  performSuccessSagas: [ () => false ],
  successFunctions: [ () => false ],
  successSagas: [ () => false ],
  successFunctionsArgs: [ {} ],
  successSagasArgs: [ {} ],
  putSuccessFunctionsResults: [ () => false ],
  putSuccessSagasResults: [ () => false ],
  performFailFunctions: [ () => false ],
  performFailSagas: [ () => false ],
  failFunctions: [ () => false ],
  failSagas: [ () => false ],
  failFunctionsArgs: [ {} ],
  failSagasArgs: [ {} ],
  putFailFunctionsResults: [ () => false ],
  putFailSagasResults: [ () => false ]
}

const generalOptionsKeys = Object.keys(generalOptions)
const generalOptionsKeysNotArray = [ 'logError', 'parseError', 'logParsedError', 'customErrorMessage' ]

export const arrayKeys = _differenceWith(generalOptionsKeys, generalOptionsKeysNotArray, _isEqual)

export function* _sagaWrapper(action) {
  let sagaResult
  let caughtError
  let caughtErrorParsed

  const { saga, options } = action.payload
  const usedOptions = Object.assign({}, generalOptions, options)
  const {
    performPreWrapFunctions, performPreWrapSagas,
    preWrapFunctions, preWrapSagas,
    preWrapFunctionsArgs, preWrapSagasArgs,
    putPreWrapFunctionsResults, putPreWrapSagasResults,
    performErrorFunctions, performErrorSagas,
    errorFunctions, errorSagas,
    errorFunctionsArgs, errorSagasArgs,
    putErrorFunctionsResults, putErrorSagasResults,
    performPostWrapFunctions, performPostWrapSagas,
    postWrapFunctions, postWrapSagas,
    postWrapFunctionsArgs, postWrapSagasArgs,
    putPostWrapFunctionsResults, putPostWrapSagasResults,
    performSuccessFunctions, performSuccessSagas,
    successFunctions, successSagas,
    successFunctionsArgs, successSagasArgs,
    putSuccessFunctionsResults, putSuccessSagasResults,
    performFailFunctions, performFailSagas,
    failFunctions, failSagas,
    failFunctionsArgs, failSagasArgs,
    putFailFunctionsResults, putFailSagasResults,
    logError, logParsedError, parseError, customErrorMessage
  } = usedOptions

  /* Pre Wrap Functions */
  const _performPreWrapFunctions = Array.isArray(performPreWrapFunctions) ? performPreWrapFunctions : [ performPreWrapFunctions ]
  const _preWrapFunctions = Array.isArray(preWrapFunctions) ? preWrapFunctions : [ preWrapFunctions ]
  const _preWrapFunctionsArgs = Array.isArray(preWrapFunctionsArgs) ? preWrapFunctionsArgs : [ preWrapFunctionsArgs ]
  const _putPreWrapFunctionsResults = Array.isArray(putPreWrapFunctionsResults) ? putPreWrapFunctionsResults : [ putPreWrapFunctionsResults ]

  for (let index = 0; index < _preWrapFunctions.length; index++) {
    const correspondingPerformCheck = _performPreWrapFunctions[index]
    const preWrapFunction = _preWrapFunctions[index]
    const correspondingArgument = _preWrapFunctionsArgs[index]
    const correspondingPutCheck = _putPreWrapFunctionsResults[index]

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
  const _preWrapSagasArgs = Array.isArray(preWrapSagasArgs) ? preWrapSagasArgs : [ preWrapSagasArgs ]
  const _putPreWrapSagasResults = Array.isArray(putPreWrapSagasResults) ? putPreWrapSagasResults : [ putPreWrapSagasResults ]

  for (let index = 0; index < _preWrapSagas.length; index++) {
    const correspondingPerformCheck = _performPreWrapSagas[index]
    const preWrapSaga = _preWrapSagas[index]
    const correspondingArgument = _preWrapSagasArgs[index]
    const correspondingPutCheck = _putPreWrapSagasResults[index]

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
    caughtError = error
    // Handle error logging
    if (logError(action, error)) {
      console.error(error)
    }
    const parsedError = customErrorMessage || parseError(error)
    caughtErrorParsed = parsedError
    if (logParsedError(action, parsedError)) {
      console.error(parsedError)
    }
    // Handle error actions
    const _performErrorFunctions = Array.isArray(performErrorFunctions) ? performErrorFunctions : [ performErrorFunctions ]
    const _errorFunctions = Array.isArray(errorFunctions) ? errorFunctions : [ errorFunctions ]
    const _errorFunctionsArgs = Array.isArray(errorFunctionsArgs) ? errorFunctionsArgs : [ errorFunctionsArgs ]
    const _putErrorFunctionsResults = Array.isArray(putErrorFunctionsResults) ? putErrorFunctionsResults : [ putErrorFunctionsResults ]

    for (let index = 0; index < _errorFunctions.length; index++) {
      const correspondingPerformCheck = _performErrorFunctions[index]
      const errroFunction = _errorFunctions[index]
      const correspondingArgument = _errorFunctionsArgs[index]
      const correspondingPutCheck = _putErrorFunctionsResults[index]

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
    const _errorSagasArgs = Array.isArray(errorSagasArgs) ? errorSagasArgs : [ errorSagasArgs ]
    const _putErrorSagasResults = Array.isArray(putErrorSagasResults) ? putErrorSagasResults : [ putErrorSagasResults ]

    for (let index = 0; index < _errorSagas.length; index++) {
      const correspondingPerformCheck = _performErrorSagas[index]
      const errorSaga = _errorSagas[index]
      const correspondingArgument = _errorSagasArgs[index]
      const correspondingPutCheck = _putErrorSagasResults[index]

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
  /* Post Wrap Functions */
  const _performPostWrapFunctions = Array.isArray(performPostWrapFunctions) ? performPostWrapFunctions : [ performPostWrapFunctions ]
  const _postWrapFunctions = Array.isArray(postWrapFunctions) ? postWrapFunctions : [ postWrapFunctions ]
  const _postWrapFunctionsArgs = Array.isArray(postWrapFunctionsArgs) ? postWrapFunctionsArgs : [ postWrapFunctionsArgs ]
  const _putPostWrapFunctionsResults = Array.isArray(putPostWrapFunctionsResults) ? putPostWrapFunctionsResults : [ putPostWrapFunctionsResults ]

  for (let index = 0; index < _postWrapFunctions.length; index++) {
    const correspondingPerformCheck = _performPostWrapFunctions[index]
    const postWrapFunction = _postWrapFunctions[index]
    const correspondingArgument = _postWrapFunctionsArgs[index]
    const correspondingPutCheck = _putPostWrapFunctionsResults[index]

    if (correspondingPerformCheck(action, correspondingArgument,
      { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
    )) {
      const result = postWrapFunction(action, correspondingArgument,
        { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
      )
      if (correspondingPutCheck(action, correspondingArgument,
        { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
      )) {
        if (result && result.type) {
          yield put(result)
        } else if (correspondingArgument.PUT_TYPE) {
          yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
        }
      }
    }
  }

  /* Post Wrap Sagas */
  const _performPostWrapSagas = Array.isArray(performPostWrapSagas) ? performPostWrapSagas : [ performPostWrapSagas ]
  const _postWrapSagas = Array.isArray(postWrapSagas) ? postWrapSagas : [ postWrapSagas ]
  const _postWrapSagasArgs = Array.isArray(postWrapSagasArgs) ? postWrapSagasArgs : [ postWrapSagasArgs ]
  const _putPostWrapSagasResults = Array.isArray(putPostWrapSagasResults) ? putPostWrapSagasResults : [ putPostWrapSagasResults ]

  for (let index = 0; index < _preWrapSagas.length; index++) {
    const correspondingPerformCheck = _performPostWrapSagas[index]
    const postWrapSaga = _postWrapSagas[index]
    const correspondingArgument = _postWrapSagasArgs[index]
    const correspondingPutCheck = _putPostWrapSagasResults[index]
    if (correspondingPerformCheck(action, correspondingArgument,
      { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
    )) {
      const result = yield call(postWrapSaga, action, correspondingArgument,
        { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
      )
      if (correspondingPutCheck(action, correspondingArgument, result,
        { result: sagaResult, error: caughtError, parsedError: caughtErrorParsed }
      )) {
        if (result && result.type) {
          yield put(result)
        } else if (correspondingArgument.PUT_TYPE) {
          yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
        }
      }
    }
  }

  if (caughtError) {
    /* Fail Functions */
    const _performFailFunctions = Array.isArray(performFailFunctions) ? performFailFunctions : [ performFailFunctions ]
    const _failFunctions = Array.isArray(failFunctions) ? failFunctions : [ failFunctions ]
    const _failFunctionsArgs = Array.isArray(failFunctionsArgs) ? failFunctionsArgs : [ failFunctionsArgs ]
    const _putFailFunctionsResults = Array.isArray(putFailFunctionsResults) ? putFailFunctionsResults : [ putFailFunctionsResults ]

    for (let index = 0; index < _failFunctions.length; index++) {
      const correspondingPerformCheck = _performFailFunctions[index]
      const failFunction = _failFunctions[index]
      const correspondingArgument = _failFunctionsArgs[index]
      const correspondingPutCheck = _putFailFunctionsResults[index]

      if (correspondingPerformCheck(action, correspondingArgument,
        { error: caughtError, parsedError: caughtErrorParsed }
      )) {
        const result = failFunction(action, correspondingArgument,
          { error: caughtError, parsedError: caughtErrorParsed }
        )
        if (correspondingPutCheck(action, correspondingArgument,
          { error: caughtError, parsedError: caughtErrorParsed }
        )) {
          if (result && result.type) {
            yield put(result)
          } else if (correspondingArgument.PUT_TYPE) {
            yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
          }
        }
      }
    }

    /* Fail Sagas */
    const _performFailSagas = Array.isArray(performFailSagas) ? performFailSagas : [ performFailSagas ]
    const _failSagas = Array.isArray(failSagas) ? failSagas : [ failSagas ]
    const _failSagasArgs = Array.isArray(failSagasArgs) ? failSagasArgs : [ failSagasArgs ]
    const _putFailSagasResults = Array.isArray(putFailSagasResults) ? putFailSagasResults : [ putFailSagasResults ]

    for (let index = 0; index < _failSagas.length; index++) {
      const correspondingPerformCheck = _performFailSagas[index]
      const failSaga = _failSagas[index]
      const correspondingArgument = _failSagasArgs[index]
      const correspondingPutCheck = _putFailSagasResults[index]

      if (correspondingPerformCheck(action, correspondingArgument,
        { error: caughtError, parsedError: caughtErrorParsed }
      )) {
        const result = yield call(failSaga, action, correspondingArgument,
          { error: caughtError, parsedError: caughtErrorParsed }
        )
        if (correspondingPutCheck(action, correspondingArgument, result,
          { error: caughtError, parsedError: caughtErrorParsed }
        )) {
          if (result && result.type) {
            yield put(result)
          } else if (correspondingArgument.PUT_TYPE) {
            yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
          }
        }
      }
    }
  } else {
    /* Success Functions */
    const _performSuccessFunctions = Array.isArray(performSuccessFunctions) ? performSuccessFunctions : [ performSuccessFunctions ]
    const _successFunctions = Array.isArray(successFunctions) ? successFunctions : [ successFunctions ]
    const _successFunctionsArgs = Array.isArray(successFunctionsArgs) ? successFunctionsArgs : [ successFunctionsArgs ]
    const _putSuccessFunctionsResults = Array.isArray(putSuccessFunctionsResults) ? putSuccessFunctionsResults : [ putSuccessFunctionsResults ]

    for (let index = 0; index < _successFunctions.length; index++) {
      const correspondingPerformCheck = _performSuccessFunctions[index]
      const successFunction = _successFunctions[index]
      const correspondingArgument = _successFunctionsArgs[index]
      const correspondingPutCheck = _putSuccessFunctionsResults[index]

      if (correspondingPerformCheck(action, correspondingArgument, { result: sagaResult })) {
        const result = successFunction(action, correspondingArgument, { result: sagaResult })
        if (correspondingPutCheck(action, correspondingArgument, { result: sagaResult })) {
          if (result && result.type) {
            yield put(result)
          } else if (correspondingArgument.PUT_TYPE) {
            yield put({ type: correspondingArgument.PUT_TYPE, payload: result })
          }
        }
      }
    }

    /* Success Sagas */
    const _performSuccessSagas = Array.isArray(performSuccessSagas) ? performSuccessSagas : [ performSuccessSagas ]
    const _successSagas = Array.isArray(successSagas) ? successSagas : [ successSagas ]
    const _successSagasArgs = Array.isArray(successSagasArgs) ? successSagasArgs : [ successSagasArgs ]
    const _putSuccessSagasResults = Array.isArray(putSuccessSagasResults) ? putSuccessSagasResults : [ putSuccessSagasResults ]

    for (let index = 0; index < _successSagas.length; index++) {
      const correspondingPerformCheck = _performSuccessSagas[index]
      const successSaga = _successSagas[index]
      const correspondingArgument = _successSagasArgs[index]
      const correspondingPutCheck = _putSuccessSagasResults[index]

      if (correspondingPerformCheck(action, correspondingArgument, { result: sagaResult })) {
        const result = yield call(successSaga, action, correspondingArgument,
          { error: caughtError, parsedError: caughtErrorParsed }
        )
        if (correspondingPutCheck(action, correspondingArgument, result,
          { error: caughtError, parsedError: caughtErrorParsed }
        )) {
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
  yield takeEvery(SAGA_WRAPPER, _sagaWrapper)
}

export default function* rootSaga() {
  yield all([
    watchSagaWrapper()
  ])
}
