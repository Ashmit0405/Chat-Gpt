import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncfunction.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken";
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        const res = await user.save({ validateBeforeSave: false })
        if (!res) {
            throw new ApiError(504, "Tokens not saved");
        }
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating referesh and access token")
    }
}

const registeruser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const existeduser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existeduser) {
        throw new ApiError(409, "Email or username already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while creating user.")
    }

    return res.status(201).json(
        new ApiResponse(200, createduser, "User created successfully")
    )

})

const loginuser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body
    if (!email && !name) {
        throw new ApiError(400, "Username or email is required");
    }
    const user = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User Not Found");
    }
    const passvalid = await user.ispasswordcorrect(password);
    if (!passvalid) throw new ApiError(400, "Password not correct");

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        }
    }, {
        new: true,
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logout successful"))
})

const refreshaccesstoken=asyncHandler(async(req,res)=>{
    const incomrefresh=req.cookies.refreshToken||req.body.refreshToken
    if(!incomrefresh){
        throw new ApiError(401,"Unauthorized request");
    }
    try {
        const decodedtoken=jwt.verify(incomrefresh,process.env.REFRESH_TOKEN_SECRET);
        const user=await User.findById(decodedtoken?._id)
        if(!user){
            throw new ApiError(401,"Invalid Refresh token");
        }
    
        if(incomrefresh!==user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used");
        }
    
        const options={
            httpOnly: true,
            secure: true
        };
    
        const {accessToken,newRefreshToken}=await generateAccessAndRefereshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken",accessToken)
        .cookie("refreshToken",newRefreshToken)
        .json(new ApiResponse(200,{accessToken,refreshToken: newRefreshToken},"Access Token refreshed successfully"))
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid Refresh Token")
    }
})

export {refreshaccesstoken,loginuser,logout,registeruser}