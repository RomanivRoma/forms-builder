import { User } from "./user.interface";

export interface LoggedUser{
    accessToken: string,
    user: User
}