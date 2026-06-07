import express, { Request, Response } from 'express';
import {User} from "../models/user-schema";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/user/register", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = User.build({
        username,
        email,
        password
    });
    await newUser.save();
    const userJwt = jwt.sign(
        {
            id: newUser!.id,
            email: newUser.email
        },
        process.env.JWT_KEY!
    )
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send({ message: "success", data: newUser });
})

export { router as registerUserRouter };