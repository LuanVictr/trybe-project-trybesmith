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
      username: Joi.string().min(3).required(),
      vocation: Joi.string().min(3).required(),
      level: Joi.number().min(1).required(),
      password: Joi.string().min(8).required(),
    });
    return userSchemma.validate(object);
  }

  public async createUser(userInfo: User) {
    const { error } = UserServices.validateUser(userInfo);
    console.log(error);
    if (error) {
      throw Object.assign(
        new Error(error.message),
        error.details[0].type === 'any.required' ? { status: 400 } : { status: 422 },
      );
    }
    await this.model.createUser(userInfo);
    const token = this.jtoken.generateToken({ username: userInfo.username });
    return token;
  }
}

export default UserServices;