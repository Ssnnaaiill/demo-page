module.exports = {
  root: true,
  env: {
    browser: true,
    "jest/globals": true,
    node: true
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended"
  ],
  plugins: ["jest"],
  // add your custom rules here
  rules: {
    "vue/multi-word-component-names": ["error", {
      ignores: ["default"]
    }],
    quotes: [2, "double", { avoidEscape: false }],
    semi: [2, "always"],
    "no-extra-semi": "off"
  }
};
