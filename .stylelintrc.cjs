module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss'
  ],
  plugins: [
    'stylelint-order'
  ],
  overrides: [
    {
      files: ['*.scss', '**/*.scss', '.*vue', '**/*.vue'], // 指定 .scss 檔
      rules: {
        'scss/no-global-function-names': null, // 關閉此規則
        'keyframes-name-pattern': "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$", // 連字符號命名
        'scss/dollar-variable-pattern': null,
        // 'alpha-value-notation': ["percentage", { "exceptProperties": ["opacity"] }], // 透明度值使用百分比
        // 'custom-property-pattern': ["^([a-z][a-z0-9]*)(-[a-z0-9]+)*$", { "message": "Expected custom property name to be kebab-case" }],
      }
    }
  ],
  rules: {
    // 'unit-allowed-list': ['em', 'rem', 'deg', 'px', 'vw', 'vh', '%'], // 可使用的單位
    //'order/properties-alphabetical-order': null, // 不照字母順序排序
    'order/properties-order': [ // 設定排序順序（plugins 必須先定義 stylelint-order）
      'content',
      'position',
      'inset',
      'inset-block',
      'inset-inline',
      'top',
      'bottom',
      'left',
      'right',
      'transform',
      'display',
      'flex-direction',
      'flex-wrap',
      'align-items',
      'justify-content',
      'float',
      'clear',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'line-height',
      'aspect-ratio',
      'margin',
      'margin-block',
      'margin-inline',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-block',
      'padding-inline',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-image',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'scale',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
      'overflow',
      'overflow-x',
      'overflow-y',
      'pointer-events',
      'z-index'
    ],
  },
  ignoreFiles: ["**/_type.scss", "**/*.css", "**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx", "**/*.json", "**/*.html", "**/*.md", "**/*.yml", "**/*.yaml"]
}