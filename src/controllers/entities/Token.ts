import jwt, { JwtPayload } from 'jsonwebtoken'

interface BodyTokenJWT {
  userId: string
  reservationId?: string
}

export default class Token {
  static generate (body: BodyTokenJWT, exp: string | number, privatePwd: string): string {
    return jwt.sign(body, privatePwd, {
      expiresIn: exp
    })
  }

  static verify (token: string, privatePwd: string): string | JwtPayload {
    return jwt.verify(token, privatePwd)
  }

  static decode (token: string): JwtPayload | string | null {
    return jwt.decode(token)
  }

  get (): void {

  }
}
