import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.RENDER === "true" ||
    process.env.VERCEL === "1" ||
    process.env.COOKIE_SECURE === "true";
const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
};

const toClientUser = (user) => ({
    id: user._id,
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
});

// for registration or new user
export const register = async (req, res) => {
    try {

        // checking all fields are filled by the user
        const { fullname, email,  phoneNumber, password, role } = req.body
        if (!fullname || !email || ! phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Some fields are missing fill it correctly",
                success: false,
            });
        };

        // checking duplicate email entered by the user
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "This email is already exist",
                success: false,
            })
        }

        // converting password in hash
        const hashedPassword = await bcrypt.hash(password, 8);
        let profilePhoto = "";
        const fileUri = getDataUri(req.file);
        if (fileUri) {
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
             phoneNumber,
            password: hashedPassword,
            role,
             profile:{
                profilePhoto,
            }
        })

        return res.status(201).json({
            message: "Account created successfully, Please login.",
            success: true,
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Signup failed. Please try again.",
            success: false,
        });
    }
}


// for existing user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Some fields are missing fill it correctly",
                success: false,
            });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }

        // checking the role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            })
        }

        // generating token 
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                message: "Server auth secret is missing.",
                success: false,
            });
        }

        const tokenData = {
            user: user._id
        }

        const token =  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = toClientUser(user);

        return res.status(200).cookie("token", token, authCookieOptions).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Login failed. Please try again.",
            success: false,
        });

    }
}

// for logout
export const logout = async (req, res) =>{
    try{
        return res.status(200).cookie("token", "", {
            ...authCookieOptions,
            maxAge: 0,
        }).json({
            message:"Logged out successfully.",
            success:true

        })

    } catch(err){
 console.log(err)
 return res.status(500).json({
    message: "Logout failed. Please try again.",
    success: false,
 });
    }
}

// update profile
export const updateProfile = async (req, res) =>{
    try{
        const {fullname, email,  phoneNumber, bio, skills} = req.body;
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }

        



        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if(!user){
             return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }
// updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if( phoneNumber) user. phoneNumber =  phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // resume will also come here later.......

        const fileUri = getDataUri(req.file);
        if (fileUri){
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url  //save the cloudinary url
            user.profile.resumeOriginalName = req.file.originalname // save the original file name
        }

        await user.save();

          user = toClientUser(user);

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Profile update failed. Please try again.",
            success: false,
        });
    }
}
