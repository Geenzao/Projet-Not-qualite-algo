module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["airbnb-base", "eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "no-console": "off",
        "import/prefer-default-export": "off",
        "linebreak-style": ["error", "unix"]
    }
};
