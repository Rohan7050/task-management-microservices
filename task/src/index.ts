import app from "./app";
import mongoose from 'mongoose';
import { rabbitMQWrapper } from "./rabbitmq-wrapper";
import { UserCreatedSubscriber } from "./event/subscriber/user-crreate.subscriber";

const startDbConnection = async () => {
    if(!process.env.JWT_KEY) {
        throw  new Error("JWT_KEY must be defined!")
    }
    if(!process.env.MONGO_URI) {
        throw  new Error("MONGO_URI must be defined!")
    }
    if(!process.env.RABBITMQ_URL) {
        throw  new Error("MONGO_URI must be defined!")
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        await rabbitMQWrapper.connect(process.env.RABBITMQ_URL);
        await new UserCreatedSubscriber(rabbitMQWrapper.channel).subscribe();
    }catch(e) {
        console.log(e);
    }
}

app.listen(3000, () => {
    console.log("Task service is running on port 3000");
    startDbConnection().then(() => {
        console.log("Database Connected")
    });
})