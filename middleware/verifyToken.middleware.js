import jwt from 'jsonwebtoken'
import {response} from '../config/response.config.js'

const verify = (req, res, next) => {
    const token = req.headers["x-sange-token"];
    if (!token) {
        return response(res, 403, "A token is required for authentication")
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return response(res, 401, "Invalid Token");
    }

    return next();
}

export default verify