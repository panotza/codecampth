module.exports = {
    async list (db) {
        console.log('list');
        const [row] = await db.query(`
            SELECT id, title, completed
            FROM todos
        `)
        return row.map(t => {
            return {
                id: t.id,
                title: t.title,
                completed: t.completed
            }
        });
    },
    async find (db, id) {
        console.log('find: ' + id);
        const [row] = await db.query(`
            SELECT id, title, completed
            FROM todos
            WHERE id = ?
        `, [+id]);
        const todo = row[0];
        if (!todo) {
            return false;
        }
        return {
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        };
    },
    async store (db, title) {
        const [row] = await db.query(`
            INSERT INTO todos (title) VALUES
            (?)
        `, [title]);
        if (!row.insertId) {
            return false;
        }
        return {
            id: row.insertId,
            title,
            completed: 0
        };
    },
    async remove (db, id) {
        const [row] = await db.query(`
            DELETE FROM todos WHERE id = ?
        `, [+id]);
        return row.affectedRows;
    },
    async setComplete (db, id, completed) {
        const [row] = await db.query(`
            UPDATE todos SET completed = ?
            WHERE id = ?
        `, [completed, +id]);
        return row.affectedRows;
    }
}