module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier',
        'react-hooks',
        'react-perf',
    ],
    rules: {
        'no-console': 'warn',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                parser: 'flow',
                bracketSpacing: true,
            },
        ],
        'max-len': ['warn', 120],
        'import/prefer-default-export': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react-perf/jsx-no-new-object-as-prop': 'warn',
        'react-perf/jsx-no-new-array-as-prop': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        // if you use React 17+; otherwise, turn this on
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-undef': 'off',
    },
    ignorePatterns: ['node_modules'],
};
