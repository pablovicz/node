/* import patterns
    1. CommonJS => require
        1.1 example
            const http = require('http');
        1.2 type => commonjs
    
    2. ESModule => 
        1.1 example
            
            import http from 'node:http';
             
            node modules need to specify node: before package name

        1.2 type => module
            - need to put the "type" "module" at package.json
        1.3 pattern
            import/export
**/
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { routeParams } from './middlewares/params.js';




const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route => route.method === method && buildRoutePath(route.path).test(url))

    if (route) {
        
        routeParams(req, res, route);

        return await route.handler(req, res);
    }

    return res.writeHead(404).end();
})


server.listen(3333)