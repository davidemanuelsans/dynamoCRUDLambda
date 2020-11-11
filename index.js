const httpGEThandler = require('httpGEThandler');
const httpPUThandler = require('httpPUThandler');

exports.handler = async (event, context, callback) => {
    const method = event.httpMethod
    const queryParams = event.queryStringParameters
    const body = event.body
    var requestHandler

    switch (method) {
        case 'POST':
            requestHandler = httpPUThandler.handle
            break;
        case 'PUT':
            requestHandler = httpPUThandler.handle
            break;    
        default:
            requestHandler = httpGEThandler.handle
    }

    return requestHandler(queryParams, body)
};