import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
        businessId: String,
        businessName: String,
        rating: Number,
        comment: String
    },
    {collection: "reviews"}
);

export default schema;