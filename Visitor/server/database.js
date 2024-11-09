const { response } = require("express");
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "kri22tika",
    host: "localhost",
    port: 5432,
    database: "visitor_info"
});

module.exports = pool;