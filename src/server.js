import http from 'node:http';
import { jsonBodyHandler } from './middlewares/jsonBodyHandler.js';

const server = http.createServer(async (request, response) => {
    const { method, url, headers, socket } = request;
    
    // middleware responsável por processar o corpo da requisição
    await jsonBodyHandler(request, response);

    if (method === 'GET' && url === '/products') {
        response.statusCode = 200;
        console.log(request.body);
        return response.end('Lista de produtos');
    };
    if (method === 'POST' && url === '/products') {
        response.statusCode = 201;
        console.log(request.body);
        return response.end('Produto cadastrado com sucesso');
    };
    return response.writeHead(404).end('404 Not Found');
});

server.listen(3333);