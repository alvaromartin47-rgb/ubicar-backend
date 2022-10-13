import Login from '../../src/controllers/entities/Login';
import UserSchema from '../../src/services/db/models/UserSchema';
import Password from '../../src/controllers/entities/Password';

describe('LoginTest', () => {

    test('loginWithEmailAndPasswordCorrectReturnASessionActive', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'riverplate';
    
        process.env.PRIVATE_PWD = 'privatePwdTest';
        jest.spyOn(UserSchema, 'findOne').mockReturnValue({
            email,
            password: await Password.encrypt(password),
        });
    
        const login = new Login(email, password);
        const accessToken = await login.login();
    
        expect(true).toBe(accessToken != null);
    
        jest.restoreAllMocks();
    });
    
    test('loginWithEmailIncorrectRaiseExceptionError', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'prueba1234';
    
        process.env.PRIVATE_PWD = 'privatePwdTest';
        jest.spyOn(UserSchema, 'findOne').mockReturnValue(null);
    
        const login = new Login(email, password);
    
        await expect(login.login()).rejects.toThrowError('User not found');
    
        jest.restoreAllMocks();
    });
    
    test('loginWithPasswordIncorrectRaiseExceptionError', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = 'prueba1234';
    
        process.env.PRIVATE_PWD = 'privatePwdTest';
        jest.spyOn(UserSchema, 'findOne').mockReturnValue({
            email,
            password: 'errorPassword'
        });
    
        const login = new Login(email, password);
    
        await expect(login.login()).rejects.toThrowError('Password incorrect');
    
        jest.restoreAllMocks();
    });

});