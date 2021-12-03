import { get, Omit } from "lodash";
import { FilterQuery, LeanDocument } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import config from "config"
import { decode, sign } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { Request, Response } from "express";

export async function createSession(userId: any, userAgent: string) {

    const session = await Session.create({ user: userId, userAgent});
    
    return session.toObject();
}

export function createAccessToken({
    user,
    session,
}: {
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>;
    session:
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {

    const accessToken = sign(
        {...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl")}
    );

    return accessToken;
} 

export async function reIssueAccessToken(refreshToken: string) {

    // Decode refresh token
    const { decoded } = decode(refreshToken);

    if(!decoded || !get(decoded, "_id")) return false;

    // Get the session
    const session = await Session.findById(get(decoded, "_id"));

    if(!session || !session?.valid) return false;

    const user = await findUser({ _id: session.user});
    
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
}