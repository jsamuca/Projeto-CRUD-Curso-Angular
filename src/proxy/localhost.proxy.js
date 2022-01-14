const PROXY_CONFIG = [{
    context: [
        "/incluir",
        "/api/curso/consultar",
        "/alterar",
        "/excluir"
    ],
    target: "https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com",
    secure: true,
    "logLevel": "debug"
}]

module.exports = PROXY_CONFIG;