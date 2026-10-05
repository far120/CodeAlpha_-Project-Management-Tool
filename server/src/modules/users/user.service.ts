import Iuser from "./user.types";
import { UserRole } from "./user.types";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../core/errors/AppError";
import APIFeatures from "../../core/utils/apiFeatures";

export const registerService = async (user: Iuser) => {
    user.role="user";
    user.summary = "";
    const createUser = await User.create(user);  
    return createUser;  
}


export const logInService = async (user: Iuser) => {
    const findUser = await User.findOne({email: user.email}).select("+password");
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    if(findUser.isBlocked){
        throw new AppError("User is blocked", 401);
    }

    const isMatch = await bcrypt.compare(user.password, findUser.password);
    if(!isMatch){
        throw new AppError("Invalid password", 401);
    }
    const token = jwt.sign({ id: findUser._id , role: findUser.role , firstname: findUser.firstName , lastname: findUser.lastName }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return {findUser, token};
}


export const changePasswordService = async (id: string, data: { oldPassword: string; newPassword: string }) => {
    const findUser = await User.findById(id).select("+password");
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(data.oldPassword, findUser.password);
    if(!isMatch){
        throw new AppError("Invalid password", 401);
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    const updatePassword = await User.findByIdAndUpdate(findUser._id, { password: hashedPassword }, { new: true });
    return updatePassword;
}


export const getAllUsersService = async (queryString: Record<string, any>) => {
  const features = new APIFeatures(
    User.find().select("-password"),
    queryString
  )
    .filter()
    .sort()
    .search(["firstName", "lastName", "email","role", "phone", "address"]);

  await features.paginate();

  const users = await features.query;
  const pagination = features.pagination;

  return {users, pagination};
};

export const getMeService = async (id: string) => {
    const findUser = await User.findById(id).select("-password");
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}   

export const updateUserService = async (id: string, data: Iuser) => {
    const findUser = await User.findByIdAndUpdate(id, data, { new: true });
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}

export const deleteUserService = async (id: string) => {
    const findUser = await User.findByIdAndDelete(id);
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}


export const blockUserService = async (id: string) => {
    const user = await User.findById(id);
    if(!user){
        throw new AppError("User not found", 404);
    }
    const findUser = await User.findByIdAndUpdate(id, { isBlocked: !user.isBlocked }, { new: true });
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}

export const roleOfUserService = async (id: string , role: UserRole) => {
    const findUser = await User.findById(id);
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    const updateRole = await User.findByIdAndUpdate(id, { role }, { new: true });
    if(!updateRole){
        throw new AppError("User not found", 404);
    }
    return findUser;
}

export const createuserServicebySuperAdmin = async (user: Iuser) => {
     user.summary = "";
    const createUser = await User.create(user);  
    
    return createUser;  
}   

   