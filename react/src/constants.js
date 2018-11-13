export const APP_PREFIX = '@react-base-app-mantle'

export const ROUTE_URL = {
  startScreen: '/',
  generateMnemonic: '/generate-mnemonic',
  loadMnemonic: '/load-mnemonic',
  notes: '/notes'
}

export const NOT_AUTHENTICATED_ROUTES = [ ROUTE_URL.startScreen, ROUTE_URL.generateMnemonic, ROUTE_URL.loadMnemonic ]
export const AUTHENTICATED_ROUTES = [ ROUTE_URL.notes ]

export default {
  ROUTE_URL,
  NOT_AUTHENTICATED_ROUTES,
  APP_PREFIX
}
