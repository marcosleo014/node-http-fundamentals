import { parseRoute } from "./utils/parseUrl.js";

export const routes = [
    {
        method: 'GET',
        path: '/products',
        controller: ({request, response, database}) => {
            response.statusCode = 200;
            const products = database.select('products');
            try {
                response.write(JSON.stringify(products));
            } catch (error) {
                response.write('[]')
            }
            return response.end();
        }
    },
    {
        method: 'POST',
        path: '/products',
        controller: async ({request, response, database}) => {
            response.statusCode = 201;
            await database.insert('products', request.body);
            return response.end();
        }
    },
    {
        method: 'DELETE',
        path: '/products/:id',
        controller: async ({request, response, database}) => {
            try {
                const id = request.params.id
                const productDeleted = await database.delete('products', id);
                response.write(JSON.stringify(productDeleted));
            } catch (error) {
                response.write('{}');
            };
            return response.end();
        }
    }
].map((route) => {
    return { ...route, pathRegex: parseRoute(route.path)};
});