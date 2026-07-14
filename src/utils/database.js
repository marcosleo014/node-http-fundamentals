import fs from 'node:fs/promises';

const DATABASE_URL = new URL('../db.json', import.meta.url);

export class Database {
    constructor(database) {
        this.database = database;
    }

    // método factory assíncrona para instanciamento do objeto database
    static async create() {
        const data = await fs.readFile(DATABASE_URL, 'utf-8');
        return new Database(JSON.parse(data));
    }

    persist() {
        fs.writeFile(DATABASE_URL, JSON.stringify(this.database));
    }

    insert(table, data) {
        const newData = {
            id: Date.now().toString(),
            ...data
        };
        if (Array.isArray(this.database[table])) {
            this.database[table].push(newData);
        } else {
            this.database[table] = [newData];
        };
        this.persist();
    }

    select(table) {
        return this.database[table];
    }

    delete(table, id) {
        const productDeleted = this.database[table].filter((produtc => produtc.id === id))[0];
        this.database[table] = this.database[table].filter((produtc => produtc.id !== id));
        this.persist();
        return productDeleted;
    }
};