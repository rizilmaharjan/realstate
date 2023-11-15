import { signin, signup } from "../Repository";
import jwt from "jsonwebtoken";

export const signUpUser = async (values: Record<string, any>) => {
  try {
    const response = await signup(values);
    return response;
  } catch (error: any) {
    return error;
  }
};
export const signInUser = async (values: Record<string, any>) => {
  try {
    const response = await signin(values);
    if (response.status === 200) {
      const token = jwt.sign(
        {
          id: response.userData._id,
        },
        process.env.SECRETKEY as string
      );
      return {...response, token}
    }
    return response;
  } catch (error: any) {
    return error;
  }
};
