// TODO: we need to improve this, I think we cannot use objects for errors we need to be able to define classes so we can pass custom messages/infos (class ContracErrort extends BaseError { ... }; // (e.g.); new ContractError("message", { contractName: "bla" }) )

module.exports = {
  error: {
    status: 500,
    message: 'Internal server error',
    description: 'The system experienced an error, we\'ve been notified about this and we will investigate soon, please contact us if this error persists.'
  },
  contract_error: {
    public: 'internal',
    status: 500,
    message: 'Contract Error',
    description: 'An Ethereum contract method was called, but the method returned an error.'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized',
    description: 'Request is unauthorized'
  },
  forbidden: {
    status: 403,
    message: 'Forbidden',
    description: 'Request is forbidden'
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
