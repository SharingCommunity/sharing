module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["vue"],
  extends: [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "prettier"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
