import express, { Request, Response } from "express";
import { User } from "../models/user-schema";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { body } from "express-validator";
import { UserCreatePublisher } from "../event/publisher/user-create.publisher";
import { rabbitMQWrapper } from "../rabbitmq-wrapper";

const router = express.Router();

router.post(
  "/api/user/register",
  [
    body("username")
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("username must be between 4 to 20 chars"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 to 20 chars"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = User.build({
      username,
      email,
      password,
    });
    await newUser.save();
    const userJwt = jwt.sign(
      {
        id: newUser!.id,
        email: newUser.email,
      },
      process.env.JWT_KEY!,
    );
    req.session = {
      jwt: userJwt,
    };
    const userCreated = new UserCreatePublisher(rabbitMQWrapper.channel);
    await userCreated.publish({
      id: newUser!.id.toString(),
      email: newUser.email,
      username
    })
    res.status(201).send({ message: "success", data: newUser });
  },
);

export { router as registerUserRouter };
