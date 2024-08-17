import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';

const databasePath = new URL('db.json', import.meta.url);


class Database {

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

    select(table, search) {

        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {

                    return row[key]?.toLowerCase().includes(value.toLowerCase())
                })
            })
        }

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

    delete(table, uuid) {

        const rowIndex = this.#database[table].findIndex(row => row.uuid === uuid);

        if (rowIndex > -1) {

            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

    update(table, uuid, data) {


        const rowIndex = this.#database[table].findIndex(row => row.uuid === uuid);

        if (rowIndex > -1) {
            const current = this.#database[table][rowIndex];
            this.#database[table][rowIndex] = Object.assign(current, data);
            this.#persist();
        }
    }
}



export const database = new Database();