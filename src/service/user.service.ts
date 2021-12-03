import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>){

    try {
        return await User.create(input);

    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function validatePassword({ email, password}: { 
        email: UserDocument["email"];
        password: string;
    }){

        const user = await User.findOne({email});

        if(!user) {
            return false;
        }

        const isValid = await user.comparePassword(password);

        if(!isValid) {
            return false;
        }

        return omit(user.toObject(), "password");
    }

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return Session.updateOne(query, update)
}