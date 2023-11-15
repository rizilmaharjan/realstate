import { Request, Response } from "express";
import { googleLogin, signInUser, signUpUser } from "../services";
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
        const expiryDate = new Date(Date.now() + 3600000)
      return res
        .cookie("access_token", login.token, { httpOnly: true, expires: expiryDate})
        .status(login.status)
        .json({ message: login.message, user: login.userData });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const google = async (req: Request, res: Response) => {
  try {
    const login = await googleLogin(req.body);
    if (login) {
      const expiryDate = new Date(Date.now() + 3600000)
      res
        .cookie("access_token", login.token, { httpOnly: true, expires: expiryDate })
        .status(login.status)
        .json({ message: login.message, user: login.userData });
    }
  } catch (error: any) {
    console.log("this is controller error", error);
    return res.status(400).json({ message: error });
  }
};
