import _camelCase from 'lodash/camelCase'
import { sagaWrapper, arrayKeys } from './sagaWrapper'
import defaultOptions from './defaultOptions'

const additional = 'additional'

export default (saga, options) => {
  const usedOptions = { ...defaultOptions }
  Object.entries(options).forEach(
    ([ key, value ]) => {
      if (arrayKeys.includes(key) && key.startsWith(additional)) {
        const additionalKey = _camelCase(key.slice(additional.length))
        console.log('additioxnalKey: ', additionalKey)
        const existingValue = Array.isArray(usedOptions[additionalKey])
          ? usedOptions[additionalKey]
          : [ usedOptions[additionalKey] ]
        usedOptions[additionalKey] = [ ...existingValue, value ]
      } else {
        usedOptions[key] = value
      }
    }
  )
  return sagaWrapper(saga, usedOptions)
}
