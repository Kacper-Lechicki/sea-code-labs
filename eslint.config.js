const nx = require('@nx/eslint-plugin');
const angularEslint = require('@angular-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tsSortKeys = require('eslint-plugin-typescript-sort-keys');
const templateParser = require('@angular-eslint/template-parser');
const angularEslintTemplate = require('@angular-eslint/eslint-plugin-template');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = [
  ...nx['configs']['flat/base'],
  ...nx['configs']['flat/typescript'],
  ...nx['configs']['flat/javascript'],
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      '@angular-eslint': angularEslint,
      '@angular-eslint/template': angularEslintTemplate,
      'simple-import-sort': simpleImportSort,
      'typescript-sort-keys': tsSortKeys,
      '@stylistic': stylistic,
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/.angular/**',
      '**/.husky/**',
      '**/.idea/**',
      '**/.nx/**',
      '**/.vscode/**',
      '**/node_modules/**',
    ],
  },
  {
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // CUSTOM RULES - TYPESCRIPT
    files: ['apps/**/src/app/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...angularEslint.configs.recommended.rules,
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sc',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'sc',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/no-host-metadata-property': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          memberVariableDeclaration: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-field',
            'protected-field',
            'private-field',
            'public-method',
            'protected-method',
            'private-method',
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variableLike', 'memberLike', 'property', 'method'],
          leadingUnderscore: 'allow',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: ['enumMember'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          modifiers: ['global'],
          format: ['UPPER_CASE', 'camelCase'],
        },
        {
          selector: ['property'],
          modifiers: ['static'],
          format: ['UPPER_CASE', 'camelCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': ['error', { allow: ['overrideMethods'] }],
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': ['off', { ignoreParameters: true }],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          variables: true,
          functions: false,
          classes: false,
        },
      ],
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/unified-signatures': 'error',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/type-annotation-spacing': 'error',
      'typescript-sort-keys/interface': 'warn',
      'typescript-sort-keys/string-enum': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@angular*'],
            [
              '^@ngrx*',
              '^@ngxs*',
              '^date*',
              '^file*',
              '^lodash*',
              '^ng2*',
              '^ngx*',
              '^node*',
              '^path*',
              '^rxjs*',
              '^uuid*',
            ],
            ['^@*'],
            ['^\\.'],
            ['^'],
          ],
        },
      ],
      'comma-spacing': 'error',
      'arrow-body-style': ['warn', 'as-needed'],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': [
        'warn',
        {
          objects: 'always-multiline',
          arrays: 'always-multiline',
          functions: 'never',
          imports: 'only-multiline',
        },
      ],
      'constructor-super': 'error',
      curly: 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': 'off',
      'id-match': 'off',
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'off',
        {
          code: 200,
        },
      ],
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'no-empty-function': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['^lodash$', '^rxjs/internal/.*$'],
        },
      ],
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'warn',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      radix: 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // CUSTOM RULES - HTML
    files: ['apps/**/src/app/**/*.html'],
    languageOptions: {
      parser: templateParser,
      parserOptions: {
        project: './tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...angularEslintTemplate.configs.recommended.rules,
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: false,
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
          ],
        },
      ],
    },
  },
];
