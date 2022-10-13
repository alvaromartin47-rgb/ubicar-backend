import jwt from 'jsonwebtoken';

export default class Token {
    
    static generate(body, exp, privatePwd) {
        return jwt.sign(body, privatePwd, {
            expiresIn: exp
        });
    }

    static verify(token, privatePwd) {
        return jwt.verify(token, privatePwd);
    }

    static decode(token) {
        return jwt.decode(token);
    }

}