module.exports = {
  'env': {
    'es2021': true,
    'node': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:cypress/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/prop-types': 0,
    'cypress/no-unnecessary-waiting': 0,
    /**
     * Jsdoc rules.
     */
    'jsdoc/check-indentation': 1,
    'jsdoc/check-line-alignment': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/no-bad-blocks': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-throws': 1
  }
}
