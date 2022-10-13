import CardSchema from '../services/db/models/CardSchema';

async function getCards(req, res) {
    try {
        const cards = await CardSchema.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json(error);
    }
}

export default getCards;