import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

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

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
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

        await User.create({
            fullname,
            email,
             phoneNumber,
            password: hashedPassword,
            role,
             profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })

        return res.status(201).json({
            message: "Account created successfully",
            succes: true,
        })

    } catch (err) {
        console.log(err)
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
        if (!email) {
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
        const tokenData = {
            user: user._id
        }

        const token =  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
             phoneNumber: user. phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (err) {
        console.log(err)

    }
}

// for logout
export const logout = async (req, res) =>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true

        })

    } catch(err){
 console.log(err)
    }
}

// update profile
export const updateProfile = async (req, res) =>{
    try{
        const {fullname, email,  phoneNumber, bio, skills} = req.body;
        const file = req.file;
         // cloudinary will be here 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
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

        if (cloudResponse){
            user.profile.resume = cloudResponse.secure_url  //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }

        await user.save();

          user = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
             phoneNumber: user. phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    }catch(err){
        console.log(err)
    }
}