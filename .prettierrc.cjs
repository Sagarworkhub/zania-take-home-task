module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  jsxSingleQuote: true,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,

  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^~/?__mocks__/?(.*)$',
    '^~/?assets/?(.*)$',
    '^~/?components/?(.*)$',
    '^~/?features/?(.*)$',
    '^~/?lib/?(.*)$',
    '^~/?routes/?(.*)$',
    '^[../]',
    '^[./]',
  ],
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['classProperties', 'typescript', 'jsx'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
};

/*
    ni -D prettier \
    @trivago/prettier-plugin-sort-imports \
    prettier-plugin-tailwindcss
*/
