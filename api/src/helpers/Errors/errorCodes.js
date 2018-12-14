module.exports = {
  internal: {
    status: 500,
    message: 'Internal server error',
    description: 'There was an internal error, please contact us if this persists'
  },
  contract_fail: {
    public: 'internal',
    status: 500,
    message: 'Contract method failure',
    description: 'Contract method failed.'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized',
    description: 'Requested is unauthorized'
  },
  user_not_admin: {
    status: 401,
    message: 'Admin only',
    description: 'Must be an admin user type to perform this action'
  },
  invalid_address: {
    status: 401,
    message: 'Invalid address',
    description: 'Supplied parameter must by a valid hex address'
  },
  invalid_signature: {
    status: 401,
    message: 'Invalid signature',
    description: 'Supplied data was not signed correctly'
  },
  validation: {
    status: 400,
    message: 'Parameter validation failed',
    description: 'One or more parameters are invalid'
  },
  missing_token: {
    status: 401,
    message: 'Authenticated request missing token',
    description: 'Please provide a token as the Authorization header to authenticate yourself'
  },
  invalid_token: {
    status: 401,
    message: 'Auth token is invalid',
    description: 'The token provided is invalid'
  },
  user_not_found: {
    status: 404,
    message: 'User not found',
    description: 'No user was found'
  },
  signature_not_matching_address: {
    status: 400,
    message: 'Signature does not match the account address',
    description: 'The provided signature does not match the provided account address, was the signature created properly?'
  },
  data_not_found: {
    status: 404,
    message: 'Data not found',
    description: 'No data was found'
  }
}
