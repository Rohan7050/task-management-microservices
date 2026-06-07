import app from "./app";
import mongoose from 'mongoose';

const startDbConnection = async () => {
    if(!process.env.JWT_KEY) {
        throw  new Error("JWT_KEY must be defined!")
    }
    if(!process.env.MONGO_URI) {
        throw  new Error("MONGO_URI must be defined!")
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }catch(e) {
        console.log(e);
    }
}

app.listen(3000, () => {
    console.log("Auth service is running on port 3000");
    startDbConnection().then(() => {
        console.log("Database Connected")
    });
})