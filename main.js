"use strict";
let express         = require("express"),
    app             = express(),
    logger          = require("morgan"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    compression     = require("compression");

app
    .use(compression({ threshold: 0 }))
    .use(logger('dev'))
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())
    .use(cookieParser())
    .use("/js", express.static("js"))
    .use("/css", express.static("css"))
    .use("/templates", express.static("templates"))
    .use("/node_modules", express.static("node_modules"))
    .use("/fonts", express.static("fonts"))
    .use((req,res,next) => {
        res
            .header("Access-Control-Allow-Origin","*")
            .header("Access-Control-Expose-Headers","Content-Type,Cookie,Set-Cookie");
        next();
    });

app.options("*",(req,res) => {
    res
        .header("Access-Control-Allow-Methods",setting['allow-method'].toString())
        .header("Access-Control-Allow-Origin","*")
        .header("Access-Control-Allow-Headers","Accept, Authorization, Content-Type")
        .status(204)
        .end();
});

app.post("/auth",(req,res) => {
    res
        .headers('foo','bar')
        .status(200)
        .end();
});

app.get("/olo",(req,res) => {
   res.status(400).json({Olo:"asdas"}).end();
});




app.listen(9200,() => {
    console.log("SERVER::START");
});