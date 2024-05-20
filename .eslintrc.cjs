module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
      alias: { map: [['@', './src/app']] },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        tsconfigRootDir: './',
        project: './tsconfig.json',
        sourceType: 'module',
        extraFileExtensions: ['.html'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'react-refresh', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    complexity: [2, 10],
    curly: 2,
    'default-case': 2,
    'default-case-last': 2,
    eqeqeq: [2, 'smart'],
    'max-depth': [2, 4],
    'max-statements': [2, 20],
    'max-params': [2, 5],
    'max-nested-callbacks': [2, 4],
    'max-lines-per-function': [
      2,
      {
        max: 280,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'no-alert': 2,
    'no-console': [
      1,
      {
        allow: ['warn', 'error', 'debug'],
      },
    ],
    'no-constant-binary-expression': 2,
    'no-constructor-return': 2,
    'no-else-return': [
      2,
      {
        allowElseIf: false,
      },
    ],
    'no-eval': 2,
    'no-extend-native': 2,
    'no-implicit-coercion': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-multi-str': 2,
    'no-extra-bind': 2,
    'no-multi-assign': 2,
    'no-new-wrappers': 2,
    'no-negated-condition': 2,
    'no-new-object': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 2,
    'no-plusplus': 2,
    'no-promise-executor-return': 2,
    'no-proto': 2,
    'no-restricted-syntax': [
      2,
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys, values, entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'for..of loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys, values, entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-return-assign': [2, 'always'],
    'no-return-await': 0,
    'no-self-compare': 2,
    'no-sequences': [
      2,
      {
        allowInParentheses: false,
      },
    ],
    'no-shadow': 0,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false,
      },
    ],
    'no-unreachable-loop': 2,
    'no-unused-expressions': 0,
    'no-useless-call': 2,
    'no-use-before-define': 0,
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'prefer-destructuring': [
      2,
      {
        array: false,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-exponentiation-operator': 2,
    'prefer-numeric-literals': 2,
    'prefer-object-has-own': 2,
    'prefer-object-spread': 2,
    'prefer-template': 2,
    'prettier/prettier': 2,
    radix: 2,
    'object-shorthand': 2,
    'require-atomic-updates': 2,
    'import/default': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-cycle': 2,
    'import/no-duplicates': [
      2,
      {
        considerQueryString: true,
      },
    ],
    'import/no-empty-named-blocks': 2,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
      },
    ],
    'import/no-named-as-default-member': 0,
    'import/no-namespace': 0,
    'import/no-unresolved': 2,
    'import/no-useless-path-segments': [
      2,
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
      },
    ],
    'import/prefer-default-export': 0,
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    '@typescript-eslint/array-type': [
      2,
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/ban-tslint-comment': 2,
    '@typescript-eslint/consistent-type-assertions': [
      2,
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 2,
    '@typescript-eslint/consistent-generic-constructors': 2,
    '@typescript-eslint/consistent-type-definitions': 2,
    '@typescript-eslint/consistent-type-exports': [
      2,
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/dot-notation': [
      2,
      {
        allowIndexSignaturePropertyAccess: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/method-signature-style': 2,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'default',
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['strictCamelCase', 'UPPER_CASE'],
        modifiers: ['const'],
        types: ['boolean', 'string', 'number'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: ['variable', 'property'],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'has', 'should', 'can', 'will'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: ['typeLike', 'enum'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'enumMember',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
    '@typescript-eslint/no-base-to-string': 2,
    '@typescript-eslint/no-confusing-void-expression': 2,
    '@typescript-eslint/no-dynamic-delete': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-invalid-void-type': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-redeclare': 2,
    '@typescript-eslint/no-redundant-type-constituents': 2,
    '@typescript-eslint/no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
        ignoreTypeValueShadow: true,
        ignoreFunctionTypeParameterNameValueShadow: true,
      },
    ],
    '@typescript-eslint/no-throw-literal': 2,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
    '@typescript-eslint/no-unnecessary-condition': 2,
    '@typescript-eslint/no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        ignoreTypeReferences: true,
      },
    ],
    '@typescript-eslint/prefer-includes': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-reduce-type-parameter': 2,
    '@typescript-eslint/prefer-ts-expect-error': 2,
    '@typescript-eslint/require-array-sort-compare': [
      2,
      {
        ignoreStringArrays: true,
      },
    ],
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      {
        allowNumberAndString: false,
        skipCompoundAssignments: false,
      },
    ],
    '@typescript-eslint/return-await': [2, 'in-try-catch'],
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/switch-exhaustiveness-check': 2,
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true,
      },
    ],
    '@typescript-eslint/unified-signatures': 2,
    'react/prefer-stateless-function': 'error',
    'react/button-has-type': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/jsx-pascal-case': 'error',
    'react/no-children-prop': 'error',
    'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-max-depth': ['error', { max: 15 }],
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react-refresh/only-export-components': 'warn',
  },
}
