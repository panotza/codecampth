const repo = require('../repo/todo');

module.exports = {
    async list (ctx) {
        const cachedTodos = await ctx.redisGet('todos');
        if (cachedTodos) {
            return ctx.body = JSON.parse(cachedTodos);
        }
        const todos = await repo.list(ctx.db);
        await ctx.redisSet('todos', JSON.stringify(todos)); 
        ctx.body = todos;
    },
    async create (ctx) {
        const { title } = ctx.request.body;
        const insertTodo = await repo.store(ctx.db, title);
        if (!insertTodo.id) {
            ctx.throw('cannot create new todo.');
        }
        ctx.body = insertTodo;
    },
    async get (ctx) {
        const cachedTodo = await ctx.redisGet('todo:' + ctx.params.id);
        if (cachedTodo) {
            return ctx.body = JSON.parse(cachedTodo);
        }
        const todo = await repo.find(ctx.db, ctx.params.id);
        if (!todo) {
            ctx.throw('todo not found.');
        }
        await ctx.redisSet('todo:' + todo.id, JSON.stringify(todo)); 
        ctx.body = todo;
    },
    async delete (ctx) {
        await repo.remove(ctx.db, ctx.params.id);
        await ctx.redisDel('todo:' + ctx.params.id);
        ctx.body = {};
    },
    async setComplete (ctx) { 
        const result = await repo.setComplete(ctx.db, ctx.params.id, 1);
        if (!result) {
            ctx.throw('todo not found.');
        }
        const todo = await repo.find(ctx.db, ctx.params.id);
        ctx.redisDel('todo:' + ctx.params.id);
        ctx.redisDel('todos');
        ctx.body = {};
    },
    async setIncomplete (ctx) {
        const result = await repo.setComplete(ctx.db, ctx.params.id, 0);
        if (!result) {
            ctx.throw('todo not found.');
        }
        const todo = await repo.find(ctx.db, ctx.params.id);
        ctx.redisDel('todo:' + ctx.params.id);
        ctx.redisDel('todos');
        ctx.body = {};
    }
}