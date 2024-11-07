const express = require("express")
const app = express()
const postRouter = require("./routers/posts.js")
const notFoundMiddleware = require("./middlewares/notFound.js")
const loggerMiddleware = require("./middlewares/logger.js")
app.use(express.json())
app.use(express.static('public'))

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen(PORT, (req, res) => {
    console.log(`Server is running at ${HOST}:${PORT}`);
})

app.use(loggerMiddleware)

app.use("/posts", (req, res, next) => {
    throw new Error("You broke everything...")
    
});

app.use("/posts", postRouter)

app.use(notFoundMiddleware)

app.use((err, req, res, next) => {
    console.log("Error:", err.message);
    console.error(err.stack);
    res.status(500).send({
        message: "Something went wrong",
        error: err.message
    })  
})

