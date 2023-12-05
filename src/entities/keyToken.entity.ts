import {Schema} from "mongoose";
import mongoose from "mongoose";

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'tb_key'

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: 'Shop'
    },
    privateKey: {
        type: String,
        require: true
    },
    publicKey: {
        type: String,
        require: true
    },
    refreshTokensUsed: {
        type: Array,
        default: []
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

export const keyTokenEntity = mongoose.model(DOCUMENT_NAME, keyTokenSchema)
