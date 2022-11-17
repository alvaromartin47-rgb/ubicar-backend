import User from './User';
import Token from './Token';

export default class Login {
 
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async login() {
        const user = await User.create(this.email);
        const isMatch = await user.comparePassword(this.password);

        if (!isMatch) throw new Error('Password incorrect');

        return Token.generate(
            user.toJSON(),
            '1h',
            process.env.PRIVATE_PWD
        );
        
    }

}