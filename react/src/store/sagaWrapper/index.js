import _camelCase from 'lodash/camelCase'
import { sagaWrapper, arrayKeys } from './sagaWrapper'
import defaultOptions from './defaultOptions'

const additional = 'additional'
const argType = 'args'
const performType = 'perform'
const putType = 'put'
const funcType = 'func'

// lodash capitalize is not used because lodash capitalize turns failFunctions into Failfunctions.
// That is undesrable. Desirable is to turn failFunctions into FailFunctions
const capitalize = value => value[0].toUpperCase() + value.slice(1)

const getExistingValueArray = (existingValue, defaultType) => {
  if (existingValue) {
    return [ existingValue ]
  }
  return defaultType === argType ? [ {} ] : [ () => true ]
}

const setAdditionalValue = (existingValue, additionalValue, defaultType) => {
  const _existingValue = Array.isArray(existingValue) ? existingValue : getExistingValueArray(existingValue, defaultType)
  return [ ..._existingValue, additionalValue ]
}

const getKeyType = key => {
  if (key.endsWith('Args')) {
    return argType
  } else if (key.startsWith('perform')) {
    return performType
  } else if (key.startsWith('put')) {
    return putType
  }
  return funcType
}

const buildFunctionKey = (key, keyType) => {
  if (keyType === funcType) {
    return key
  } else if (keyType === performType) {
    return _camelCase(key.slice('perform'.length))
  } else if (keyType === putType) {
    return _camelCase(key.slice('put'.length, -'results'.length))
  } else if (keyType === argType) {
    return _camelCase(key.slice(0, -'args'.length))
  }
}

const buildPerformKey = functionKey => _camelCase(`perform${capitalize(functionKey)}`)
const buildPutKey = functionKey => _camelCase(`put${capitalize(functionKey)}Results`)
const buildArgsKey = functionKey => _camelCase(`${functionKey}Args`)

export default (saga, options = {}) => {
  const usedOptions = { ...defaultOptions }

  Object.entries(options).forEach(([ key, value ]) => {
    if (key.startsWith(additional)) {
      const additionalKey = _camelCase(key.slice(additional.length))
      if (arrayKeys.includes(additionalKey)) {
        usedOptions[additionalKey] = setAdditionalValue(usedOptions[additionalKey], value)
      }
    } else {
      usedOptions[key] = value
    }
  })

  Object.keys(Object.assign({}, usedOptions)).forEach(key => {
    if (arrayKeys.includes(key)) {
      const keyType = getKeyType(key)
      const functionKey = buildFunctionKey(key, keyType)
      const performCheckKey = buildPerformKey(functionKey)
      const putCheckKey = buildPutKey(functionKey)
      const argumentKey = buildArgsKey(functionKey)

      if (usedOptions[functionKey] && !Array.isArray(usedOptions[functionKey])) {
        usedOptions[functionKey] = [ usedOptions[functionKey] ]
      }
      if (usedOptions[performCheckKey] && !Array.isArray(usedOptions[performCheckKey])) {
        usedOptions[performCheckKey] = [ usedOptions[performCheckKey] ]
      }
      if (usedOptions[putCheckKey] && !Array.isArray(usedOptions[putCheckKey])) {
        usedOptions[putCheckKey] = [ usedOptions[putCheckKey] ]
      }
      if (usedOptions[argumentKey] && !Array.isArray(usedOptions[argumentKey])) {
        usedOptions[argumentKey] = [ usedOptions[argumentKey] ]
      }

      const arrays = [
        usedOptions[functionKey] || [],
        usedOptions[performCheckKey] || [],
        usedOptions[putCheckKey] || [],
        usedOptions[argumentKey] || []
      ].sort((a, b) => b.length - a.length)

      const targetLength = arrays[0].length

      while (!usedOptions[functionKey] || usedOptions[functionKey].length < targetLength) {
        usedOptions[functionKey] = setAdditionalValue(usedOptions[functionKey], () => true, funcType)
      }
      while (!usedOptions[performCheckKey] || usedOptions[performCheckKey].length < targetLength) {
        usedOptions[performCheckKey] = setAdditionalValue(usedOptions[performCheckKey], () => true, performType)
      }
      while (!usedOptions[putCheckKey] || usedOptions[putCheckKey].length < targetLength) {
        usedOptions[putCheckKey] = setAdditionalValue(usedOptions[putCheckKey], () => true, putType)
      }
      while (!usedOptions[argumentKey] || usedOptions[argumentKey].length < targetLength) {
        usedOptions[argumentKey] = setAdditionalValue(usedOptions[argumentKey], {}, argType)
      }
    }
  })

  return sagaWrapper(saga, usedOptions)
}
