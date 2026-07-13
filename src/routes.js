import { parseRoute } from "./utils/parseUrl.js";

export const routes = [
    {
        method: 'GET',
        path: '/products',
        controller: ({request, response, database}) => {
            response.statusCode = 200;
            const products = database.select('products');
            response.write('Lista de produtos: ');
            try {
                for (const product of products) {
                    response.write(`\n${product.name} por R$${product.price} com ID: ${product.id}`);
                };
            } catch (error) {
                response.write('Não há produtos cadastrados')
            }
            return response.end();
        }
    },
    {
        method: 'POST',
        path: '/products',
        controller: ({request, response, database}) => {
            response.statusCode = 201;
            database.insert('products', request.body);
            const nameProduct = request.body.name
            return response.end('Produto cadastrado com sucesso: ' + nameProduct);
        }
    },
    {
        method: 'DELETE',
        path: '/products/:id',
        controller: ({request, response, database}) => {
            try {
                const id = request.params.id
                const productDeleted = database.delete('products', id);
                console.log(id, productDeleted);
                response.write(`${productDeleted.name} foi deletado`);
            } catch (error) {
                response.write('produto não encontrado')
            };
            return response.end();
        }
    }
].map((route) => {
    return { ...route, pathRegex: parseRoute(route.path)};
});