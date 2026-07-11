export async function jsonBodyHandler(request, response) {
    try {
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        };
        const bodyRequest = Buffer.concat(buffers).toString();
        request.body = JSON.parse(bodyRequest);
    } catch (error) {
        request.body = null;
    };
    response.setHeader('Content-Type', 'application/json');
};