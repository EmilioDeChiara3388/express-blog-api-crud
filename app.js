const express = require("express")
const app = express()
const postRouter = require("./routers/posts.js")
//const postHome = require("./routers/home.js")
const notFoundMiddleware = require("./middlewares/notFound.js")
const loggerMiddleware = require("./middlewares/logger.js")
const errorMiddleware = require("./middlewares/error.js")
app.use(express.json())
app.use(express.static('public'))

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${HOST}:${PORT}`);
})



/* app.use("/posts", (req, res, next) => {
    throw new Error("You broke everything...")
    
}); */

app.use(loggerMiddleware)

app.use("/posts", postRouter)
app.use("/", (req, res) => {
    res.send("Per l'elenco dei post, aggiungi '/posts' all'url qui sopra!")
})


app.use(notFoundMiddleware)

app.use(errorMiddleware)

