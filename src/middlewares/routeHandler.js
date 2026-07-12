import { routes } from '../routes.js';

export function routeHandler(request, response) {
    const route = routes.find(route => route.method === request.method && route.pathRegex.test(request.url));

    if (route) {
        // extração dos parâmetros de rota
        const routeParams = request.url.match(route.pathRegex);
        const { ...params } = routeParams.groups;
        request.params = params;
        return route.controller(request, response);
    } else {
        return response.writeHead(404).end('Rota não encontrada');
    };
};