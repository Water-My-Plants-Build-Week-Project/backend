const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const userRouter = require('./users/router.js')

const server = express();

const config = {
    name:"sessionId",
    secret: "chocolatechip",
    cookie:{
      maxAge: 1000 * 60 * 60,
      secure:false,
      httpOnly: true
    },
    resave:false,
    saveUnitialized:false,
  
    store: new KnexSessionStore({
      knex:require("../data/db-config.js"),
      tablename:"sessions",
      sidfieldname:"sid",
      createTable:true,
      clearInterval:1000 * 60 * 60
    })
  }


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(config))

server.use('/api/users', userRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
});
  
server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});
  
module.exports = server;