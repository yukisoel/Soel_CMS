module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/types/api.d.ts', 'src/types/api.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 未使用変数の警告を有効化
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }
    ],
    // import文の書式設定
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    // import文の順序とグルーピング
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'never'
      }
    ],
    // セミコロンなし
    'semi': ['warn', 'never'],
    // クォートの統一
    'quotes': ['warn', 'single', { 'allowTemplateLiterals': true }],
    // 末尾カンマ
    'comma-dangle': ['warn', 'never'],
    // インデント
    'indent': ['warn', 2],
    // 不要な空行を警告
    'no-multiple-empty-lines': ['warn', { 'max': 2 }],
    // console.logの警告（開発時は無効化）
    'no-console': 'off',
    // React Hooksの依存関係警告を無効化（開発効率のため）
    'react-hooks/exhaustive-deps': 'off',
    // any型の使用を警告レベルに（段階的改善のため）
    '@typescript-eslint/no-explicit-any': 'warn',
    // import順序を警告レベルに
    'import/order': 'warn',
    // React refresh警告を無効化
    'react-refresh/only-export-components': 'warn',
    // 循環複雑度の制限（新規関数に適用）
    'complexity': ['warn', { 'max': 20 }],
    // 関数の最大行数（大規模リファクタリング時の指標として） TODO: 別PRで該当ファイルはリファクタリングする
    // 'max-lines-per-function': ['warn', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
    // if文のネストレベル制限
    'max-depth': ['warn', 5],
    // 関数のパラメータ数制限
    'max-params': ['warn', 7],
    // 三項演算子のネスト制限（既存コードで使用されているため無効化）
    'no-nested-ternary': 'off',
    // magic numberの使用を警告（基本的な数値と星評価を除外）
    'no-magic-numbers': ['warn', {
      'ignore': [-1, 0, 1, 2, 3, 4, 5],
      'ignoreArrayIndexes': true,
      'ignoreDefaultValues': true,
      'enforceConst': false
    }]
  },
}
