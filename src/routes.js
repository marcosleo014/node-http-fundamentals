import { parseRoute } from "./utils/parseRoutePath.js";

export const routes = [
    {
        method: 'GET',
        path: '/products',
        controller: (request, response) => {
            response.statusCode = 200;
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
            console.log(request.params);
            return response.end('Produto excluído');
        }
    }
].map((route) => {
    return { ...route, pathRegex: parseRoute(route.path)};
});