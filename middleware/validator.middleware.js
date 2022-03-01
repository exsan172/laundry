import {validationResult} from 'express-validator'
import {response} from '../config/response.config.js'

export const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(res, 400, 'error validation', errors.array());
    }

    next()
}