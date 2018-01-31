const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const mysql = require('mysql2/promise')
const config = require('./config/db');
const router = require('./routes');
const pool = mysql.createPool(config);

new Koa()
    .use(connectDB)
    .use(cors())
    .use(bodyParser())
    .use(json())
    .use(router.routes())
    .listen(3030);

async function connectDB (ctx, next) {
    ctx.db = await pool.getConnection();
    try {
        await next();
    } finally {
        ctx.db.release();
    }
}