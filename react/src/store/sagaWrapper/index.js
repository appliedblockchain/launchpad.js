import _camelCase from 'lodash/camelCase'
import { sagaWrapper, arrayKeys } from './sagaWrapper'
import defaultOptions from './defaultOptions'

const additional = 'additional'

// lodash capitalize is not used because lodash capitalize turns failFunctions into Failfunctions.
// That is undesrable. Desirable is to turn failFunctions into FailFunctions
const capitalize = value => value[0].toUpperCase() + value.slice(1)

const getExistingValueArray = (existingValue, defaultType) => {
  if (existingValue) {
    return [ existingValue ]
  }
  return defaultType === 'o' ? [ {} ] : [ () => true ]
}

const setAdditionalValue = (existingValue, additionalValue, defaultType) => {
  const _existingValue = Array.isArray(existingValue) ? existingValue : getExistingValueArray(existingValue, defaultType)
  return [ ..._existingValue, additionalValue ]
}

/* This will not work. It will work for now, but it needs to iterate over all additionals simoultaniusly to group them */
export default (saga, options) => {
  const usedOptions = { ...defaultOptions }
  Object.entries(options).forEach(
    ([ key, value ]) => {
      if (key.startsWith(additional)) {
        const additionalKey = _camelCase(key.slice(additional.length))
        if (arrayKeys.includes(additionalKey)) {
          usedOptions[additionalKey] = setAdditionalValue(usedOptions[additionalKey], value)

          const additionalPerformCheckKey = _camelCase(`perform${capitalize(additionalKey)}`)
          const additionalPutCheckKey = _camelCase(`put${capitalize(additionalKey)}Results`)
          const additionalArgumentKey = _camelCase(`${additionalKey}Args`)

          usedOptions[additionalPerformCheckKey] = setAdditionalValue(usedOptions[additionalPerformCheckKey], () => true, 'f')
          usedOptions[additionalPutCheckKey] = setAdditionalValue(usedOptions[additionalPerformCheckKey], () => true, 'f')
          usedOptions[additionalArgumentKey] = setAdditionalValue(usedOptions[additionalPerformCheckKey], {}, 'o')
        }
      } else {
        usedOptions[key] = value
      }
    }
  )
  return sagaWrapper(saga, usedOptions)
}
