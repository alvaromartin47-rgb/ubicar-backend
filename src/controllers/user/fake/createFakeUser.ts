import Token from '../../entities/Token'
import UserSchema from '../../../services/db/models/UserModel'

async function createFakeUser (req, res) {
  const newUser = new UserSchema(req.body)
  const { id } = await newUser.save()

  const accessToken = Token.generate(
    { userId: id },
    '10m',
    process.env.PRIVATE_PWD
  )

  res.json({ accessToken })
}

export default createFakeUser
