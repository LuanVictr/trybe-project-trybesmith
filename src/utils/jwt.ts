import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface UserInfo {
  username: string;
  id?:number
}

class JasonWebToken {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  public generateToken(user:UserInfo):string {
    return jwt.sign(user, this.secret);
  }

  public async authenticateToken(token:string):Promise<string | JwtPayload> {
    try {
      if (!token) {
        throw Object.assign(
          new Error('Token not found'),
          { status: 401 },
        );
      }
      const decriptedData = await jwt.verify(token, this.secret);
      return decriptedData;
    } catch (error) {
      throw Object.assign(
        new Error('Expired or invalid token'),
        { status: 401 },
      );
    }
  }
}

export default JasonWebToken;
