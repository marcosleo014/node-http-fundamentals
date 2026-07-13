import { parseRoute } from "./utils/parseUrl.js";

export const routes = [
    {
        method: 'GET',
        path: '/products',
        controller: (request, response) => {
            response.statusCode = 200;
            console.log(request.query);
            return response.end('Lista de produtos');
        }
    },
    {
        method: 'POST',
        path: '/products',
        controller: (request, response) => {
            response.statusCode = 201;
            console.log(request.body);
            return response.end('Produto cadastrado com sucesso');
        }
    },
    {
        method: 'DELETE',
        path: '/products/:id',
        controller: (request, response) => {
            return response.end(`Produto de ID ${request.params.id} foi excluído`);
        }
    }
].map((route) => {
    return { ...route, pathRegex: parseRoute(route.path)};
});