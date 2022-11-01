import mercadopago from 'mercadopago';

async function preference(req, res) {
    mercadopago.configurations.setAccessToken(
        process.env.MP_ACCESS_TOKEN
    );
    
    const data = await mercadopago.preferences.create(req.body);
    
    res.json(data);
}

export default preference;