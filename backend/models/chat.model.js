import mongoose,{Schema} from "mongoose";

const chatschema= new Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})
export const Chat=mongoose.model("Chat",chatschema)