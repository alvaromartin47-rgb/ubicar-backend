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

        if (data) {
            await UserSchema.findByIdAndUpdate(data.id, user);
        } else {
            const newUser = new UserSchema(user);
            data = await newUser.save();
        }
        
        return data.id;
    }

}