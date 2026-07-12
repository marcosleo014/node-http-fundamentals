export function parseRoute(path) {
    // regex que identifica os padrões ":nameParams" na rota
    const routeParamsRegex = /:([a-zA-Z]+)/g;
    // Transforma os parâmetros da rota em grupos nomeados da expressão regular
    const regexPattern = path.replaceAll(routeParamsRegex, '(?<$1>[a-z0-9-_]+)');
    const pathRegex = new RegExp(`^${regexPattern}$`);
    return pathRegex;
};