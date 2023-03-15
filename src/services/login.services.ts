import Joi from 'joi';
import Login from '../interfaces/login.interface';
import LoginModel from '../models/login.model';
import JasonWebToken from '../utils/jwt';

class LoginServices {
  public model: LoginModel;

  public jtoken: JasonWebToken;

  constructor() {
    this.model = new LoginModel();
    this.jtoken = new JasonWebToken();
  }

  static validateLoginInfo(loginInfo: Login) {
    const loginSchemma = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    return loginSchemma.validate(loginInfo);
  }

  public async LoginUser(loginInfo: Login):Promise<string> {
    const { error } = LoginServices.validateLoginInfo(loginInfo);
    if (error) {
      throw Object.assign(
        new Error(error.message),
        { status: 400 }, 
      );
    }
    const [user] = await this.model.loginUser(loginInfo);
    console.log(user);
    if (!user) {
      throw Object.assign(
        new Error('Username or password invalid'),
        { status: 401 },
      );
    }
    const { id, username } = user;
    const token = this.jtoken.generateToken({ username, id });
    return token;
  }
}

export default LoginServices;