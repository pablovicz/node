

export function extractQueryParam(query) {

    if(!query || query.length === 0){

        return {};
    }

    return query.substr(1).split('&').reduce((queryParams, param) => {

        const [key, value] = param.split('=');
        queryParams[key] = value;
        return queryParams
    }, {})
}