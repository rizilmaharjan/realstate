import bcryptjs from 'bcryptjs';
import { User } from "../../models/user.model";
export const updateUser = async (
  id: string,
  decodedId: string,
  values: Record<string, any>
) => {
  let { email, profilePicture, username, password } = values;
  if (decodedId !== id)
    return { status: 401, message: "You can only update your account" };
  try {
    if(password){
        password = await bcryptjs.hash(password,12)
    }else{
        password = undefined
    }
    const updatedUser = await User.findByIdAndUpdate(
      id ,
      {
        $set: {
          email,
          profilePicture,
          username,
          password
        },
      },
      { new: true }
    );
    
      return {
        status: 200,
        message: "user updated successfully",
        userData: updatedUser
      }
    
  } catch (error: any) {
    return error;
  }
};

export const deleteUser = async (id: string, decodedId: string) => {
  if (decodedId !== id)
    return { status: 401, message: "You can only delete your account" };
  try {
    const deleteuser = await User.findByIdAndDelete(id);
    return {status:200, message: "User deleted successfully"}
  } catch (error) {
    return error;
  }
};
export const getUser = async (id: string) => {
  try {
    const user = await User.findById(id);
    if(!user) return {status: 404, message:"User not found"}
    return {status:200, message: "User fetched successfully", userData:user}
  } catch (error) {
    return error;
  }
};