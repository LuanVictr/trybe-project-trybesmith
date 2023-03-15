import { Request, Response } from 'express';
import UserServices from '../services/user.services';

class UserController {
  constructor(private userService = new UserServices()) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const userInfo = req.body;
      const result:string = await this.userService.createUser(userInfo);
      res.status(201).json({ token: result });
    } catch (error:any) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

export default UserController;