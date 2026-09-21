import { Router } from "express";
import { LoginUser } from "../controllers/auth/login";
import { RegisterUser } from "../controllers/auth/register";

const authRouter = Router();

authRouter.post("/login", LoginUser);
authRouter.post("/register", RegisterUser);

export default authRouter;
