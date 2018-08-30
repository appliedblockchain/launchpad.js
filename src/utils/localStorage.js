import _fromPairs from 'lodash/fromPairs'

const keys = {
  auth: 'persist:auth',
  registrationData: 'registrationData',
  sharedComputer: 'sharedComputer'
}

const getItem = (key, parsed = false) => {
  if (!key) {
    throw new Error(`
      You must provide an argument to getItem which is the
      item you would like to set
    `)
  }

  try {
    const item = window.localStorage.getItem(key)

    if (item === null) {
      return undefined
    }

    if (parsed) {
      try {
        if (typeof (JSON.parse(item)) === 'object') {
          return _fromPairs(Object.entries(JSON.parse(item)).map(([ key, value ]) => ([
            key, JSON.parse(value)
          ])))
        }
        return JSON.parse(item)
      } catch (_) {
        return JSON.parse(item)
      }
    }
    return item
  } catch (err) {
    return undefined
  }
}

const setItem = (key, item) => {
  if (!key || !item) {
    throw new Error(`
      You must provide two arguments to setItem. A key and an item to set. Given ${key}: ${item}
    `)
  }

  try {
    window.localStorage.setItem(key, item)
  } catch (err) {
    throw new Error(`
      There was an error setting the item: ${item} to localStorage.
    `)
  }
}

const removeItem = key => {
  try {
    window.localStorage.removeItem(key)
  } catch (err) {
    throw new Error(`
      There was an error removing the item with key: ${key} from localStorage.
  `)
  }
}

const getJWT = () => {
  try {
    return getItem(keys.auth, true).jwt
  } catch (_) {
    return null
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  getJWT,
  keys
}
