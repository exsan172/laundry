export const response = (res, status, message, data=[]) => {
    res.json({
        statusCode : status,
        message    : message,
        data       : data
    })
} 