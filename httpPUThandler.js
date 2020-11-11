const AWS = require('aws-sdk')
const responseMapper = require('responseMapper')
const dynamo = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION })

// Placeholder. Probablemente no necesitemos un método PUT/POST, los valores se inserten en BD
const handle = (queryParams = null, body) => {
    const dbParams = { TableName: process.env.DYNAMOBD_TABLE, Key: { id: 1 } }
    
    return dynamo.get(dbParams).promise()
        .then( result => { return responseMapper.mapOK(result.Item || result.Items) } )
        .catch( error => { return responseMapper.mapError(error) } )
}


module.exports = { handle }