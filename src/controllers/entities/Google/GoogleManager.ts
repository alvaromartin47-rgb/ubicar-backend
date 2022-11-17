import { OAuth2Client } from 'google-auth-library'
import { GoogleProfile } from './types'

function generateOAuth2Client (): OAuth2Client {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export default class GoogleManager {
  oAuth2Client: OAuth2Client

  constructor (oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client
  }

  static async create (code: string): Promise<GoogleManager> {
    const oAuth2Client = generateOAuth2Client()

    const res = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(res.tokens)

    return new GoogleManager(oAuth2Client)
  }

  static getUrlLogin (scope: string[]): string {
    const oAuth2Client = generateOAuth2Client()

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope
    })

    return authorizeUrl
  }

  async getProfile (): Promise<GoogleProfile> {
    const params = 'personFields=names,photos,emailAddresses'
    const url = `https://people.googleapis.com/v1/people/me?${params}`

    const { data }: any = await this.oAuth2Client.request({ url })

    return {
      name: data.names[0].givenName,
      lastname: data.names[0].familyName,
      image: data.photos[0].url,
      email: data.emailAddresses[0].value
    }
  }
}
