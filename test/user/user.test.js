import User from '../../src/controllers/entities/User';
import UserSchema from '../../src/services/db/models/UserSchema';
import Password from '../../src/controllers/entities/Password';

describe('UserTests', () => {

    test('createInexistentUserRaisesError', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        
        jest.spyOn(UserSchema, 'findOne').mockReturnValue(null);

        await expect(User.create(email)).rejects.toThrowError('User not found');

        jest.restoreAllMocks();
    });

    test('createExistentUserReturnUserClass', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'riverplate';

        process.env.PRIVATE_PWD = 'privatePwdTest';
        
        jest.spyOn(UserSchema, 'findOne').mockReturnValue({
            email,
            password: await Password.encrypt(password)
        });

        const user = await User.create(email, password);

        expect(user).toBeInstanceOf(User);

        jest.restoreAllMocks();
    });

    test('saveExistentUserInDBRaiseError', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'riverplate';

        process.env.PRIVATE_PWD = 'privatePwdTest';

        jest.spyOn(UserSchema, 'findOne').mockReturnValue({
            email,
            password: await Password.encrypt(password)
        });

        await expect(User.saveInDB(email, password)).rejects.toThrowError('User already exists');

        jest.restoreAllMocks();
    });

    test('saveNewUserInDBReturnUserObject', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'riverplate';

        process.env.PRIVATE_PWD = 'privatePwdTest';

        jest.spyOn(UserSchema, 'findOne').mockReturnValue(null);
        jest.spyOn(UserSchema.prototype, 'save')
        .mockReturnValue({ email, password });

        const user = await User.saveInDB({ email, password });

        expect(email).toBe(user.email);
        expect(password).toBe(user.password);
    
        jest.restoreAllMocks();
    });

});