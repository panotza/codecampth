const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const mysql = require('mysql2/promise');
const redis = require("redis");
const config = require('./config/db');
const router = require('./routes');
const { promisify } = require('util');
const pool = mysql.createPool(config);

new Koa()
    .use(connectRedis)
    .use(connectDB)
    .use(cors())
    .use(bodyParser())
    .use(json())
    .use(router.routes())
    .listen(3000);

async function connectDB (ctx, next) {
    ctx.db = await pool.getConnection();
    try {
        await next();
    } finally {
        ctx.db.release();
    }
}

async function connectRedis (ctx, next) {
    ctx.redis = redis.createClient();
    ctx.redisGet = promisify(ctx.redis.get).bind(ctx.redis);
    ctx.redisSet = promisify(ctx.redis.set).bind(ctx.redis);
    ctx.redisDel = promisify(ctx.redis.del).bind(ctx.redis);
    await next();
}