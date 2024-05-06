module.exports = {
  root: true,
  env: { browser: true, es2020: true, node:true , 'vitest-globals/env':true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:vitest-globals/recommended',
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.css"],

  parser: "@typescript-eslint/parser",
  plugins: ["react", "prettier", "react-refresh","simple-import-sort"],
  parserOptions: {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "comma-dangle": ["error", "only-multiline"],
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-reqiures": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "spaced-comment": ["error", "always"],
     "react/jsx-uses-vars": "error",
    "react/no-unescaped-entities": 0,
    "no-unused-vars": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

  },
};
