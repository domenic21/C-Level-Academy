import mongoose, { models, Schema } from "mongoose";

interface IProfile  extends Document {
    email: string;
    userName: string;
   
}

const ProfileSchema = new Schema<IProfile>({
    email:{type:String, required:true, unique:true},
    userName:{type:String,  unique:true},
   
});

export const ProfileModel = models?.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

//the interface is for type checking and the model is for the database connection
//the model is the connection to the database
//the interface is the type checking for the data
