import SignUp from './entities/SignUp';

async function signUp(req, res) {
    try {
        signUp = new SignUp(req.body);
        const user = await signUp.signUp();
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default signUp;