import http from 'node:http';
import { jsonBodyHandler } from './middlewares/jsonBodyHandler.js';
import { routeHandler } from './middlewares/routeHandler.js';

const server = http.createServer(async (request, response) => {
    
    // middleware responsável por processar o corpo da requisição
    await jsonBodyHandler(request, response);

    // middleware responsável pelo roteamento da requisição
    routeHandler(request, response);
});

server.listen(3333);