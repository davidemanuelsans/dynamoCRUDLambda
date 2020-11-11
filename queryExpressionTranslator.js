const getDBFilterQuery = (queryParams) => {
    const params = { TableName: process.env.DYNAMOBD_TABLE}

    if (queryParams) {
        const queryParamsKeys = Object.keys(queryParams)
        const expressionAttributeValues = {}
        queryParamsKeys.forEach( key => { expressionAttributeValues[':' + key] = parse(queryParams[key])} )
        params.FilterExpression = queryParamsKeys.reduce( (acum, key) => { return acum + ' and ' + key + ' = :' + key }, '' ).substring(5)
        params.ExpressionAttributeValues = expressionAttributeValues
    }

    return params;
}

const getDBByIDQuery = id => {
    return {
        TableName: process.env.DYNAMOBD_TABLE,
        Key: { id: parseInt(id) }
    }
}

const parse = word => {
    if (word && 'null' === word.toLowerCase()) return null;
    if (word && 'true' === word.toLowerCase()) return true;
    if (word && 'false' === word.toLowerCase()) return false;
    if (word && !isNaN(word)) return parseInt(word);
    
    return word
}

module.exports = { getDBFilterQuery, getDBByIDQuery }