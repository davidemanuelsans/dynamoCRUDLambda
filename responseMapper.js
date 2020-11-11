const mapOK = (body) => {
    return {
        "statusCode": 200,
        "body":  JSON.stringify(body || {})
    };
}

const mapError = (error) => {
    return {
        "statusCode": error.statusCode || 400,
        "body":  error.message || "Ha ocurrido un error"
    };
}

module.exports = { mapOK, mapError }