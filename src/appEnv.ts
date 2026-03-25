const parseEnv = () => {
  if (!process.env.API_URL) throw new Error('API_URL env must be set')

  if (!process.env.DUMMY_TOKEN_EXPIRES_IN_MINS) {
    throw new Error('DUMMY_TOKEN_EXPIRES_IN_MINS env must be set')
  }

  const DUMMY_TOKEN_EXPIRES_IN_MINS = +process.env.DUMMY_TOKEN_EXPIRES_IN_MINS
  if (isNaN(+process.env.DUMMY_TOKEN_EXPIRES_IN_MINS)) {
    throw new Error('DUMMY_TOKEN_EXPIRES_IN_MINS env must be a number')
  }

  if (!process.env.SESSION_SECRET) {throw new Error('SESSION_SECRET env must be set')}

  return {
    API_URL: process.env.API_URL,
    DUMMY_TOKEN_EXPIRES_IN_MINS,
  }
}

export const appEnv = parseEnv()
