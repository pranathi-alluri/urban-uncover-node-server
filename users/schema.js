import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        email: String,
        role: {
            type: String,
            enum: ["USER", "BUSINESS", "ADMIN"],
            default: "USER",
        },
        firstName: {type: String, required: true},
        lastName: {type:String, required:true},
        businessName: String,
        businessImage: String,
        claimedBusiness: String,
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
        },
        phoneNumber: {type:String, validate: /^\d{10}$/}
    },
    { collection: "users" }
);
export default schema;