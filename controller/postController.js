const posts= require("../db.js")
const fs = require("fs")

const index= (req, res) => {
    //res.send("Siamo all'Index")
    
    //console.log(title);
    
    posts.forEach(post => {
        let { title, slug, content, image, tags } = post
        let markup = `
        <li> 
        ${title}
        <p>${slug}</p>
        <p>${content}</p>
        </li>`
        res.send(markup)
    })
}

const show= (req, res) => {

    const post = posts.find(post => post.slug === (req.params.slug))
    console.log(post);
    if (!post) {
        return res.status(404).json({
            error: `404! Not found!`
        })
    }

    res.json({
        data: post
    })
}

const store = (req, res) => {
    //console.log(req.body);
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    posts.push(post)
    fs.writeFileSync("./db.js", `module.exports = ${JSON.stringify(posts, null, 4)}`)
    return res.status(200).json({
        status: 200,
        data: posts,
    })
}


module.exports = {
    index,
    show,
    store
}