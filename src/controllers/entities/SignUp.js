import Joi from '@hapi/joi';
import User from './User';

export default class SignUp {
 
    constructor(user) {
        this.user = user;
    }

    async signUp() {
        this.#isSintaxValid(
            this.user.email,
            this.user.password
        );

        return await this.#saveUserInDB();
    }

    #isSintaxValid(email, password) {
        const schema = Joi.object({
            email: Joi.string().email().required().min(8).max(32),
            password: Joi
            .string()
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/)
            .error(new Error('Password must contain at least one uppercase, one lowercase, one number, one special character')),
        });

        const { error } = schema.validate({
            email,
            password
        });

        if (error) throw new Error(error.message);
    }

    async #saveUserInDB() {
        return await User.saveInDB(this.user);
    }
    
}