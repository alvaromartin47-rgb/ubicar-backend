import SignUp from '../../src/controllers/entities/SignUp';
import User from '../../src/controllers/entities/User';
import RandExp from 'randexp';

describe('SignUpTest', () => {
    test('signUpWithEmailWithLessThanEightCharactersRaiseError', async () => {
        const email = 'a@g.com';
        const password = 'riverplate';

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('\"email\" length must be at least 8 characters long');
    });

    test('signUpWithPasswordWithMoreThanThirtyCharactersRaiseError', async () => {
        const email = 'alvaro.martinnnnnnnnnnnnnnn@hotmail.com.ar';
        const password = 'riverplate';
        
        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('\"email\" length must be less than or equal to 32 characters long');
    });

    test('signUpWithEmailWithoutArrobaRaiseError', async () => {
        const email = 'alvaromartingmail.com';
        const password = 'riverplate';

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('\"email\" must be a valid email');
    });

    test('signUpWithEmailWithoutDomainRaiseError', async () => {
        const email = 'alvaromarting@com';
        const password = 'riverplate';

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('\"email\" must be a valid email');
    });

    test('signUpWithEmailWithoutUsernameRaiseError', async () => {
        const email = '@hotmail.com.ar';
        const password = 'riverplate';

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('\"email\" must be a valid email');
    });

    test('signUpWithPasswordWithLessThanEightCharactersRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{1,7}$/).gen();
        
        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithPasswordWithMoreThanThirtyTwoCharactersRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{32,}$/).gen();

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithPasswordWithoutUppercaseRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[a-z\d$@$!%*?&]{8,32}$/).gen();

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithPasswordWithoutLowercaseRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Z\d$@$!%*?&]{8,32}$/).gen();

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithPasswordWithoutNumbersRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z$@$!%*?&]{8,32}$/).gen();

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithPasswordWithoutSpecialCharacterRaiseError', async () => {
        const email = 'alvaro@hotmail.com.ar';
        const password = new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/).gen();

        const signUp = new SignUp({ email, password });

        await expect(signUp.signUp(email, password))
        .rejects.toThrowError('Password must contain at least one uppercase, one lowercase, one number, one special character');
    });

    test('signUpWithEmailAndPasswordWithCorrectSintaxReturnUserRegistred', async () => {
        const email = 'alvaro.martin1307@gmail.com';
        const password = new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/).gen();
        jest.spyOn(User, 'saveInDB').mockReturnValue({
            email,
            password
        });

        const signUp = new SignUp({ email, password });

        const user = await signUp.signUp(email, password);

        expect(email).toBe(user.email);
        expect(password).toBe(user.password);

        jest.restoreAllMocks();
    });

})