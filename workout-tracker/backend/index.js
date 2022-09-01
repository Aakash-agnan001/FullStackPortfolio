const express = require("express")

const app = express()

SERVER_PORT = 4000
app.listen(SERVER_PORT, () => {
    console.log(`Listening to Port ${SERVER_PORT}\n`)
})