import UserSchema from '../../services/db/models/UserSchema';
import Password from './Password';

export default class User {
    
    constructor(body) {
        this.userId = body.userId;
        this.email = body.email;
        this.pwd_hash = body.password;
    }

    static async create(email) {
        const data = await UserSchema.findOne({ email });
        if (!data) throw new Error('User not found');

        return new User(data);
    }

    async comparePassword(password) {
        return await Password.compare(password, this.pwd_hash); 
    }

    toJSON() {
        return {
            userId: this.userId
        };
    }

    static async saveInDB(user) {
        const data = await UserSchema.findOne({ 
            email: user.email
        });
        if (data) throw new Error('User already exists');

        user.password = await Password.encrypt(user.password);
        const newUser = new UserSchema(user);

        return await newUser.save();
    }

}