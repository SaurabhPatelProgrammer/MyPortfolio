module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': 'off',
  },
  overrides: [
    { files: ['vite.config.js'], env: { node: true } },
  ],
};
