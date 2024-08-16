import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';

const databasePath = new URL('db.json', import.meta.url);


export class Database {

    // # -> make private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {

        const data = this.#database[table] ?? [];
        return data;
    }


    insert(table, data) {

        const uuid = randomUUID();
        const insertData = { uuid, ...data };
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(insertData)
        } else {
            this.#database[table] = [insertData]
        }
        this.#persist();
        return insertData;
    }

    delete(table, uuid){

        const rowIndex = this.#database[table].findIndex(row => row.uuid === uuid);

        if(rowIndex > -1 ){

            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }
}