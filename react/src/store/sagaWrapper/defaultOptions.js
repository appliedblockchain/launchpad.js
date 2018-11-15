/* These must be set on a app by app basis. */
const setLoading = args => {
  console.log('setLoading args: ', args); return {}
}
const setGlobalError = args => {
  console.log('setGlobalError args: ', args); return {}
}
const notifyGlobalError = args => {
  console.log('notifyGlobalError args: ', args); return {}
}

export default {
  performPreWrapFunctions: () => true,
  preWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: true }),
  putPreWrapFunctionResults: () => true,
  performErrorFunctions: () => true,
  errorFunctions: (...args) => setGlobalError(args[2], false),
  putErrorFunctionResults: () => true,
  logError: () => false,
  performPostWrapFunctions: () => true,
  postWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: false }),
  putPostWrapFunctionResults: () => true,
  performFailFunctions: () => true,
  failFunctions: (...args) => notifyGlobalError(
    `Failed to complete ${args[0].payload.saga.name} due to this error: ${args[2].parsedError}`
  ),
  putFailFunctionsResults: () => true
}
