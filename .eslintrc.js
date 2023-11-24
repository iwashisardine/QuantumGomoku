module.exports = {
    // 適用範囲の制限
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // create-react-appが生成したESLintの設定をpackage.jsonから転記
        "react-app",
        "react-app/jest",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        // ESLintのフォーマットを無効化する（設定を上書きするためextendsの最後に記述すること）
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}