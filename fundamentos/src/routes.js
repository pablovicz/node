import { database } from "./database.js";


export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const search = req.query;
            const users = database.select('users', search)
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

            console.log('aqui', uuid)
            database.delete('users', uuid)

            return res.writeHead(204).end();
        }
    },
    {
        method: 'PUT',
        path: '/user/:uuid',
        handler: (req, res) => {
            const { uuid } = req.params;

            database.update('users', uuid, req.body)

            return res.writeHead(202).end();
        }
    }
]