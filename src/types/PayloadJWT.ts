import { JwtPayload } from 'jsonwebtoken'

export interface PayloadJWT extends JwtPayload {
  userId: string
}
