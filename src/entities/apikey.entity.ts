import * as mongoose from "mongoose";
import {Schema} from "mongoose";

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "tb_api_key"

const ApiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        required: true,
        enum: ["0000", "1111", "2222"]
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

export const ApiKeyEntity = mongoose.model(DOCUMENT_NAME, ApiKeySchema)