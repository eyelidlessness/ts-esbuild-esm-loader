const config = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2020',
    tsconfigRootDir: __dirname,
    project: [ './tsconfig.eslint.json' ],
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-eslint-comments',
    'fp',
    'unicorn',
  ],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  rules: {
    /*
     * ------------------------------------------------------------------------
     * `eslint` builtins
     *
     * Where these are `'off'`, they're likely enabled and superseded by their
     * `@typescript-eslint` equivalent.
     * ------------------------------------------------------------------------
     */
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'default-param-last': 'off',
    'dot-notation': 'off',
    'func-call-spacing': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'init-declarations': 'off',
    'keyword-spacing': 'off',
    'lines-between-class-members': 'off',
    'no-array-constructor': 'off',
    'no-dupe-class-members': 'off',
    'no-duplicate-imports': 'off',
    'no-empty-function': 'off',
    'no-extra-semi': 'off',
    'no-invalid-this': 'off',
    'no-loop-func': 'off',
    'no-loss-of-precision': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-throw-literal': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'quotes': 'off',
    'require-await': 'off',
    'semi': 'off',

    /*
     * ------------------------------------------------------------------------
     * `@typescript-eslint`
     * ------------------------------------------------------------------------
     */
    '@typescript-eslint/array-type': [ 'error', {
      default: 'array-simple',
    } ],
    '@typescript-eslint/ban-ts-comment': [ 'error', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': true,
      'ts-check': true,
    } ],
    '@typescript-eslint/ban-types': 'error', // Incredibly, the defaults are sensible!
    '@typescript-eslint/brace-style': [ 'error', '1tbs', {
      allowSingleLine: true,
    } ],
    '@typescript-eslint/class-literal-property-style': [ 'error', 'fields' ],
    '@typescript-eslint/comma-dangle': [ 'error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      enums: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
      generics: 'never',
      tuples: 'always-multiline',
    } ],
    '@typescript-eslint/comma-spacing': [ 'error', {
      after: true,
      before: false,
    } ],
    '@typescript-eslint/consistent-indexed-object-style': [ 'error', 'record' ],
    '@typescript-eslint/consistent-type-assertions': [ 'error', {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    } ],
    '@typescript-eslint/consistent-type-definitions': [ 'error', 'interface' ],
    '@typescript-eslint/consistent-type-imports': [ 'error', {
      disallowTypeAnnotations: true,
      prefer: 'type-imports',
    } ],
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-member-accessibility': [ 'error', {
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'no-public',
        methods: 'explicit',
        parameterProperties: 'explicit',
        properties: 'explicit',
      },
    } ],
    '@typescript-eslint/explicit-module-boundary-types': [ 'error', {
      allowArgumentsExplicitlyTypedAsAny: false,
      allowDirectConstAssertionInArrowFunctions: false,
      allowedNames: [],
      allowHigherOrderFunctions: false,
      allowTypedFunctionExpressions: true,
    } ],
    '@typescript-eslint/func-call-spacing': [ 'error', 'never' ],
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/lines-between-class-members': [ 'error', {
      exceptAfterSingleLine: true,
    } ],
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          memberTypes: [
            'private-abstract-field',
            'protected-abstract-field',
            'public-abstract-field',

            'private-abstract-method',
            'protected-abstract-method',
            'public-abstract-method',

            'private-static-field',
            'protected-static-field',
            'public-static-field',

            'private-instance-field',
            'protected-instance-field',
            'public-instance-field',

            // Constructors
            'private-constructor',
            'protected-constructor',
            'public-constructor',

            // Methods
            'protected-instance-method',
            'private-instance-method',
            'public-instance-method',

            'private-static-method',
            'protected-static-method',
            'public-static-method',
          ],
          order: 'alphabetically',
        },
      },
    ],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: [ 'PascalCase' ],
        selector: 'enum',
      },
      {
        format: [ 'UPPER_CASE' ],
        selector: 'enumMember',
      },
      {
        format: [ 'camelCase', 'UPPER_CASE' ],
        selector: 'memberLike',
      },
      {
        format: [ 'camelCase', 'PascalCase' ],
        selector: 'parameter',
      },
      {
        format: [ 'camelCase', 'PascalCase' ],
        prefix: [ '_' ],
        selector: 'parameter',
      },
      {
        format: [ 'PascalCase' ],
        selector: 'typeLike',
      },
      {
        format: [ 'camelCase', 'UPPER_CASE' ],
        selector: 'variableLike',
      },
    ],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': [ 'error', {
      allow: [
        'private-constructors',
        'protected-constructors',
      ],
    } ],
    '@typescript-eslint/no-empty-interface': [ 'error', {
      allowSingleExtends: true,
    } ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-extraneous-class': [ 'error', {
      allowConstructorOnly: true, // e.g. a typed struct
    } ],
    '@typescript-eslint/no-implicit-any-catch': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-invalid-void-type': [ 'error', {
      allowInGenericTypeArguments: true,
    } ],
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': [ 'error', {
      builtinGlobals: true,
      hoist: 'all',
      ignoreTypeValueShadow: true,
    } ],
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': [ 'error', {
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_',
    } ],
    '@typescript-eslint/no-use-before-define': [ 'error', {
      ignoreTypeReferences: false,
      typedefs: false,
    } ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/quotes': [ 'error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    } ],
    '@typescript-eslint/require-array-sort-compare': [ 'error', {
      ignoreStringArrays: true,
    } ],
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/restrict-plus-operands': [ 'error', {
      checkCompoundAssignments: true,
    } ],
    '@typescript-eslint/restrict-template-expressions': [ 'error', {
      allowBoolean: true,
      allowNumber: true,
    } ],
    '@typescript-eslint/return-await': [ 'error', 'always' ],
    '@typescript-eslint/semi': [ 'error', 'always' ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',

    // TODO: eslint-plugin-ava, eslint-plugin-import

    /*
     * ------------------------------------------------------------------------
     * `eslint-comments`
     * ------------------------------------------------------------------------
     */
    'eslint-comments/require-description': 'error',
    'eslint-comments/no-use': [ 'error', {
      allow: [
        'eslint-disable',
        'eslint-disable-line',
        'eslint-disable-next-line',
        'eslint-enable',
      ],
    } ],

    /*
     * ------------------------------------------------------------------------
     * fp
     * ------------------------------------------------------------------------
     */
    'fp/no-arguments': 'error',
    'fp/no-delete': 'error',

    /*
     * ------------------------------------------------------------------------
     * `unicorn`
     * ------------------------------------------------------------------------
     */
    'unicorn/expiring-todo-comments': [ 'error', {
      allowWarningComments: false,
    } ],
  },

  overrides: [
    /*
     * ------------------------------------------------------------------------
     * Overrides: .eslintrc
     * ------------------------------------------------------------------------
     */
    {
      files: [ '.eslintrc.js' ],

      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },

    /*
     * ------------------------------------------------------------------------
     * Overrides: tests
     * ------------------------------------------------------------------------
     */
    {
      files: [ '*.test.ts' ],

      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
  ],
};

export default config;
