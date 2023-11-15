import { User } from "../../models/user.model";
export const signup = async (values: Record<string, any>) => {
  try {
    const saveUser = new User(values);
    const registeredUser = await saveUser.save();
    return {
      status: 201,
      message: "user registered successfully",
      userData: registeredUser,
    };
  } catch (error:any) {
    return error;
  }
};
