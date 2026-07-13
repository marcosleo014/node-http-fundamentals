import { routes } from '../routes.js';
import { extractQueryParams } from '../utils/parseUrl.js';
import { Database } from "../utils/database.js";

const database = new Database();

export function routeHandler(request, response) {
    // captura do pathName e queryString
    const [pathName, queryString] = request.url.split('?');

    const route = routes.find(route => route.method === request.method && route.pathRegex.test(pathName));

    if (route) {
        // extração dos parâmetros de rota
        const routeParams = pathName.match(route.pathRegex);
        // inserção da propriedade params no objeto request
        request.params = routeParams?.groups ?? {};

        // inserção da propriedade query no objeto request
        request.query = queryString ? extractQueryParams(queryString) : {};

        return route.controller({request,response, database});
    };
    return response.writeHead(404).end('Rota não encontrada');
};