import { Pool, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import User from '../interfaces/user.interface';

class UserModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async createUser(userInfo: User):Promise<number> {
    const { username, vocation, level, password } = userInfo;
    const query = 'INSERT INTO Trybesmith.users(username,vocation,level,password) VALUES(?,?,?,?)';
    const [{ insertId }] = await 
    this.connection.execute<ResultSetHeader>(query, [username, vocation, level, password]);
    return insertId;
  }
}

export default UserModel;