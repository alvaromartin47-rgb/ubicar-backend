import UserSchema from '../../services/db/models/UserSchema';

export default class GoogleUser {
    
    constructor(body) {
        this.userId = body.userId;
        this.email = body.email;
        this.pwd_hash = body.password;
    }

    static async create(email) {
        const data = await UserSchema.findOne({ email });
        if (!data) {
            throw new Error('GoogleUser not found');
        }

        return new GoogleUser(data);
    }

    static async saveInDB(user) {
        if (!user.email) {
            throw new Error("Email is required");
        }

        const data = await UserSchema.findOne({ 
            email: user.email
        });

        if (data) return data._id;

        const newUser = new UserSchema(user);
        const saved = await newUser.save();
        return saved._id;
    }

}