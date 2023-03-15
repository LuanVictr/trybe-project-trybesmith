import Joi from 'joi';
import JasonWebToken from '../utils/jwt';
import User from '../interfaces/user.interface';
import UserModel from '../models/users.model';

class UserServices {
  public model:UserModel;

  public jtoken:JasonWebToken;

  constructor() {
    this.model = new UserModel();
    this.jtoken = new JasonWebToken();
  }

  static validateUser(object: User) {
    const userSchemma = Joi.object({
      username: Joi.string().required(),
      vocation: Joi.string().required(),
      level: Joi.number().required(),
      password: Joi.string().required(),
    });
    return userSchemma.validate(object);
  }

  public async createUser(userInfo: User) {
    const { error } = UserServices.validateUser(userInfo);
    if (error) {
      throw Object.assign(
        new Error('Some of the reqired fields are missing'),
        { status: 500 },
      );
    }
    await this.model.createUser(userInfo);
    const token = this.jtoken.generateToken({ username: userInfo.username });
    return token;
  }
}

export default UserServices;