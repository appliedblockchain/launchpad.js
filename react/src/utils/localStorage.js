import _fromPairs from 'lodash/fromPairs'

const keys = {
  auth: 'persist:auth',
  tempMnemonic: 'temp_mnemonic'
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

export const setAuth = authObject => {
  try {
    const _persist = getItem('persist:auth', true)._persist
    setItem('persist:auth', JSON.stringify({ ...authObject, _persist }))
  } catch (error) {
    console.error(error)
  }
}

export const getAuth = (key, parsed = false) => {
  if (key === undefined) {
    return getItem('persist:auth', parsed)
  } else {
    try {
      if (parsed) {
        return getItem('persist:auth', true)[key]
      } else {
        const parsedAuthKey = getItem('persist:auth', true)[key]
        return JSON.stringify(parsedAuthKey)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const clearAuth = () => {
  try {
    window.localStorage.removeItem(keys.auth)
  } catch (error) {
    console.error(error)
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  setAuth,
  getAuth,
  clearAuth,
  keys
}
