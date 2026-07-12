export const routes = [
    {
        method: 'GET',
        resource: '/products',
        controller: (request, response) => {
            response.statusCode = 200;
            console.log(request.body);
            return response.end('Lista de produtos');
        }
    },
    {
        method: 'POST',
        resource: '/products',
        controller: (request, response) => {
            response.statusCode = 201;
            console.log(request.body);
            return response.end('Produto cadastrado com sucesso');
        }
    }
];