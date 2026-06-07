import express, { Request, Response } from 'express';
import {User} from "../models/user-schema";
import jwt from "jsonwebtoken";
import {Password} from "../utils/password.service"

const router = express.Router();

router.post("/api/user/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await Password.compare(existingUser.password, password);
    if(!passwordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    await existingUser.save();
    const userJwt = jwt.sign(
        {
            id: existingUser!.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
    )
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send({ message: "success", data: existingUser });
})

export { router as loginUserRouter };