import { Database } from "./database.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: (req, res) => {
            const { name, email } = req.body;

            database.insert('users', { name, email })

            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: '/user/:uuid',
        handler: (req, res) => {
            const { uuid } = req.params;

            database.delete('users', uuid)

            return res.writeHead(204).end();
        }
    }
]