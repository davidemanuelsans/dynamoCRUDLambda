const AWS = require('aws-sdk')
const responseMapper = require('responseMapper')
const queryExpressionTranslator = require('queryExpressionTranslator')
const dynamo = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION })

const handle = (queryParams = null, body) => {
    var dbPromise;

    if (queryParams && queryParams.id) dbPromise = getItemById(queryParams.id)
    else if (queryParams) dbPromise = getFilteredByQueryParams(queryParams)
    else dbPromise = getAll(queryParams)
    
    return dbPromise
        .then( result => { return responseMapper.mapOK(result.Item || result.Items) } )
        .catch( error => { return responseMapper.mapError(error) } )
}

const getItemById = (id) => {
    const dbParams = queryExpressionTranslator.getDBByIDQuery(id)
    
    return dynamo.get(dbParams).promise()
}

const getFilteredByQueryParams = (queryParams) => {
    const dbParams = queryExpressionTranslator.getDBFilterQuery(queryParams)
    
    return dynamo.scan(dbParams).promise()
}

const getAll = () => {
    const dbParams = queryExpressionTranslator.getDBFilterQuery()
    
    return dynamo.scan(dbParams).promise()
}

module.exports = { handle }