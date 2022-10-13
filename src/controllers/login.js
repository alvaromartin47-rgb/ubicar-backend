import Login from './entities/Login';

async function login(req, res) {
    try {
        login = new Login(req.body.email, req.body.password);
        const token = await login.login();
        
        res.json({accessToken: token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default login;