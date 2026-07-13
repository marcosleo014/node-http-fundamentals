export class Database {
    constructor() {
        this.database = {}
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
    }

    select(table) {
        return this.database[table];
    };

    delete(table, id) {
        const productDeleted = this.database[table].filter((produtc => produtc.id === id))[0];
        this.database[table] = this.database[table].filter((produtc => produtc.id !== id));
        return productDeleted;
    }
}