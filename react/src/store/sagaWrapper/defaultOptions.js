/* ToBe imported */
const setLoading = () => {}
const setGlobalError = () => {}
const notifyGlobalError = () => {}

export default {
  performPreWrapFunctions: () => true,
  preWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: true }),
  putPreWrapFunctionResults: () => true,
  performErrorFunctions: () => true,
  errorFunctions: (...args) => setGlobalError(args[3], false),
  putErrorFunctionResults: () => true,
  logError: () => false,
  performPostWrapFunctions: () => true,
  postWrapFunctions: action => setLoading({ taget: action.payload.saga.name, value: false }),
  putPostWrapFunctionResults: () => true,
  performFailFunctions: () => true,
  failFunctions: (...args) => notifyGlobalError(
    `Failed to complete ${args[0].payload.saga.name} due to this error: ${args[4]}`
  ),
  putFailFunctionResults: () => true
}
