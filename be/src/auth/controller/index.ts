import { Request, Response } from "express";
import { signInUser, signUpUser } from "../services";
export const signup = async (req: Request, res: Response) => {
  try {
    const register = await signUpUser(req.body);
    if (register) {
      return res
        .status(register.status)
        .json({ message: register.message, user: register.userData });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
export const signIn = async (req: Request, res: Response) => {
  try {
    const login = await signInUser(req.body);
    if (login) {
      return res
        .cookie("access_token", login.token, { httpOnly: true })
        .status(login.status)
        .json({ message: login.message, user: login.userData });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
