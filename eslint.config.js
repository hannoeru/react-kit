// @ts-check
import { antfu } from '@antfu/eslint-config'

export default antfu({
  react: true,
}, {
  files: ['**/*.md/*.tsx'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'react-dom/no-missing-button-type': 'off',
  },
})
