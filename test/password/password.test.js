import bcrypt from 'bcryptjs';
import Password from "../../src/controllers/entities/Password";

describe('PasswordTests', () => {

    test('encryptPasswordReturnASecurePassword', async () => {
        const password = 'prueba1234';
        const hashExpected = 'hash';

        jest.spyOn(bcrypt, 'hash').mockReturnValue(hashExpected);

        expect(await Password.encrypt(password)).toBe(hashExpected);

        jest.restoreAllMocks();
    });

    test('compareSamePasswordReturnTrue', async () => {
        const password = 'prueba1234';
        const hash = await Password.encrypt(password);

        expect(true).toBe(await Password.compare(password, hash));
    });
    
    test('compareDifferentPasswordReturnFalse', async () => {
        const password = 'prueba1234';
        const password2 = 'prueba1235';
        const hash = await Password.encrypt(password);
    
        expect(false).toBe(await Password.compare(password2, hash));
    });

});
