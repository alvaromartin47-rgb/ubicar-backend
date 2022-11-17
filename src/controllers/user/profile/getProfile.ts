import UserSchema from '../../../services/db/models/UserModel'

async function getProfile (req, res) {
  res.json(
    await UserSchema.findById(
      req.userId,
      { googleCode: 0 }
    )
  )
}

export default getProfile
