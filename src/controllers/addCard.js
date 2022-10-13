import CardSchema from '../services/db/models/CardSchema';

async function addCard(req, res) {
    try {
        const card = new CardSchema(req.body);
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json(error);
    }
}

export default addCard;