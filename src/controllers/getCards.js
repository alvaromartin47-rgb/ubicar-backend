import {OAuth2Client} from 'google-auth-library';
import url from 'url';
import keys from '../credentials.json';

async function getCards(req, res) {
    res.json({message: "cards"});
}

export default getCards;