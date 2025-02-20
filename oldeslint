module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["airbnb-base", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-console": "off",
        "import/prefer-default-export": "off",
        "linebreak-style": ["error", "unix"],
        "@typescript-eslint/no-unused-vars": ["error"],
        "prettier/prettier": [
            "error",
            {
                endOfLine: "lf",
                tabWidth: 4,
                semi: true,
                singleQuote: false,
                trailingComma: "none",
                printWidth: 180
            }
        ]
    }
};
