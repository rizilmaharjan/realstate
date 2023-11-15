import bcrypt from "bcryptjs"
import { User } from "../../models/user.model";
import { generatePassword, generateUsername } from "../../utils";
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
export const signin = async (values: Record<string, any>) => {
  const {email, password} = values;
  if(!email || !password) return {status:400, message: "Missing required fields"}
  try {
    const userExist = await User.findOne({email: email})
    if(!userExist) return {status: 401, message: "Invalid email or password"}

    const passwordMatch = await bcrypt.compare(password, userExist.password)
    if(!passwordMatch) return {status: 401, message: "Invalid email or password"}

    return {
      status: 200,
      message: "user logged in successfully",
      userData: userExist,
    };
  } catch (error:any) {
    return error;
  }
};

export const googleSignIn = async (values: Record<string, any>) => {
  const { email, name, imageUrl } = values;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return {
        status: 200,
        message: "user logged in successfully",
        userData: userExist,
      };
    } else {
      const newUser = new User({
        email,
        profilePicture: imageUrl,
        password: generatePassword(),
        username: generateUsername(name),
      });
      const savedUser = await newUser.save();
      return {
        status: 200,
        message: "user logged in successfully",
        userData: savedUser,
      };
    }
  } catch (error: any) {
    console.log("this is repository error", error);
    return error;
  }
};
