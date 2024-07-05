import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import tokens from "../2-utils/tokens";
import CredentialsModel from "../4-models/CredentialsModel";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/ErrorModel";
import {UserModel} from "../4-models/UserModel";
import { RoleModel } from "../4-models/RoleModel";
import * as bcrypt from 'bcrypt'; 
// i tried to hash with this///

async function register(user: UserModel): Promise<string> {

    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);

    if (await isUsernameTaken(user.userName)) {
        throw new ValidationErrorModel(`Username ${user.userName} already taken`);
    }

    
    // user.password = await bcrypt.hash(user.password, 10); i tried this way...
    // user.password = tokens.hash(user.password); 
    // user.role = "User"; 
// pitaron zmani- leshanot!
    const sql = `
        INSERT INTO users (firstName, lastName, userName, email, password, role) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    console.log("Executing SQL:", sql);
    console.log("With values:", [user.firstName, user.lastName, user.userName, user.email, user.password, user.role]);

    try {
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.userName, user.email, user.password, user.role]);
        console.log("SQL execution info:", info);
        
        user.userId = info.insertId;
        console.log(user + "befor token");
        const token = tokens.getNewToken(user);
        console.log(user +"after token");

        return token;
    } catch (error) {
        console.error("Failed to execute SQL:", error);
        throw new Error("Failed to register user: " + error.message);
    }
}


async function login(credentials: CredentialsModel): Promise<string> {
    console.log(credentials)

    const error = credentials.validation();
  if (error) throw new ValidationErrorModel(error);

    // credentials.password = tokens.hash(credentials.password)
    console.log(credentials.password)
    const sql = `SELECT * FROM users WHERE userName = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.userName, credentials.password])
    console.log(users);

    if (users.length === 0) {
        throw new UnauthorizedErrorModel("Incorrect username or password");
    }

  
    const user = users[0];

    // const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

    // if(!isPasswordValid){
    //     throw new UnauthorizedErrorModel("incorrest userName or password from bcrypt")
    // }
    const token = tokens.getNewToken(user)

    return token

}
async function isUsernameTaken(userName: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE userName = ?`;
    const rows = await dal.execute(sql, [userName]);
    const count = rows[0].count
    return count > 0;
}


async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT userId, firstName, lastName, userName, email, password, role FROM users`;
    const users = await dal.execute(sql);
    return users;
}

export default {
    register,
    login,
    isUsernameTaken,
    getAllUsers
}