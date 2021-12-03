import mongoose from "mongoose"
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model"

export interface PostDocument extends mongoose.Document{
    user: UserDocument["id"];
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new mongoose.Schema({

    postId: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(10)
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String
    },

    body: {
        type: String
    }
},
{
    timestamps: true
});

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;