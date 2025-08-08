// devcontainer専用のPostCSS設定
// lightningcssを使わずにTailwind CSS v4を動作させる
module.exports = {
  plugins: {
    // lightningcssの代わりにautoprefixerを使用
    'tailwindcss': {},
    'autoprefixer': {},
  },
}
