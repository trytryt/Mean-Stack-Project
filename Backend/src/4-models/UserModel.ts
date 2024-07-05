import Joi from "joi"
import {RoleModel} from "./RoleModel"


class UserModel {
    public userId:number
    public firstName: string
    public lastName: string
    public userName: string
    public email: string
    public password: string
    public role: string

    public constructor(user: Partial<UserModel>) {
        this.userId = user.userId ;
        this.firstName = user.firstName!;
        this.lastName = user.lastName!;
        this.userName = user.userName!;
        this.email = user.email!;
        this.password = user.password!;
        this.role = user.role ?? "User";
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        userName: Joi.string().required().min(4).max(30),
        email: Joi.string().required().email({ tlds: { allow: ['com', 'net', 'org', 'il'] } }),
        password: Joi.string().required().min(4).max(20),
        role: Joi.string().optional()
    })

    public validate():string |undefined {
        const result = UserModel.validationSchema.validate(this)
        return result.error?.message
    }


}

export {UserModel}

