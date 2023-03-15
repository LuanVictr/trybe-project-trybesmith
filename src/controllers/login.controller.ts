import { Request, Response } from 'express';
import LoginServices from '../services/login.services';

class LoginController {
  constructor(private loginServices = new LoginServices()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const loginInfo = req.body;
      const result = await this.loginServices.LoginUser(loginInfo);
      res.status(200).json({ token: result });
    } catch (err:any) {
      res.status(err.status).json({ message: err.message });
    }
  };
}

export default LoginController;