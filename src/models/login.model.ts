import { Pool, RowDataPacket } from 'mysql2/promise';
import Login from '../interfaces/login.interface';
import connection from './connection';

class LoginModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async loginUser(loginInfo: Login): Promise<RowDataPacket[]> {
    const { username, password } = loginInfo;
    const query = `SELECT * FROM Trybesmith.users 
    WHERE users.username = ? AND users.password = ?`;
    const [result] = await 
    this.connection.execute<RowDataPacket[]>(query, [username, password]);
    return result;
  }
}

export default LoginModel;