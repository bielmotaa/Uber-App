module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                'module:react-native-dotenv', //Ativa o plugin que lê o arquivo @env
                {
                    //O nome que você coloca em moduleName deve bater com o que você usa no declare module no env.d.ts
                    'moduleName': '@env', //Sempre que alguém escrever @env no código, vai lá no .env buscar as variáveis. -- defino o nome do modulo
                    'allowUndefined': false //Se você tentar usar uma variável que não tá no .env, vai dar erro.

                }
            ],
            ["inline-import", { "extensions": [".sql"] }]
        ]
    };
};