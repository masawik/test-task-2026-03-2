import type { Configuration } from 'lint-staged'

const config: Configuration = {
  '*.{ts,tsx}': [ 'prettier --write', 'eslint --fix' ],
  '*.scss': [ 'prettier --write', 'stylelint --fix' ],
  '*.{json,md,yml,yaml}': [ 'prettier --write' ],
}

export default config
