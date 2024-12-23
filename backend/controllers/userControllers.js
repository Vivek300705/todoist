import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../model/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Generate Access Token and Refresh Token
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.ACCESS_TOKEN_SECRET, // Use secret from environment
      { expiresIn: '1h' } // Set expiry for 1 hour
    );

    // Generate refresh token (longer expiry)
    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.REFRESH_TOKEN_SECRET, // Use refresh token secret
      { expiresIn: '7d' } // Set expiry for 7 days
    );

    user.refreshToken = refreshToken; // Save refresh token to database
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error.message);
    throw new Error("Error generating tokens");
  }
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in user registration:", error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure it's only sent over HTTPS in production
      sameSite: "Strict", // CSRF protection
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: true,
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Error in user login:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal error",
    });
  }
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the cookies (access token and refresh token)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error in user logout:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal error",
    });
  }
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new ApiError("Refresh token is required", 401);
    }
  
    try {
      // Verify the refresh token
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      // Find user by the ID stored in the refresh token
      const user = await User.findById(decodedToken?._id);
  
      if (!user) {
        throw new ApiError("User not found", 404);
      }
  
      // Check if the user has a refresh token stored in the database
      if (!user.refreshToken) {
        throw new ApiError("Refresh token not found in user record", 401);
      }
  
      // Ensure the incoming refresh token matches the one stored in the user record
      if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError("Invalid refresh token", 401);
      }
  
      // Generate a new access and refresh token
      const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id);
  
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
        sameSite: "Strict", // CSRF protection
      };
  
      // Send the new tokens in cookies
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json({
          status: true,
          message: "User's access token refreshed successfully",
          accessToken,
          newrefreshToken,
        });
    } catch (error) {
      console.error("Error refreshing access token:", error.message);
      throw new ApiError(error?.message || "Invalid refresh token", 401);
    }
  });
  export const profile = asyncHandler(async (req, res) => {
    try {
      // Log the userId attached by the middleware
      console.log("User ID from middleware:", req.user);
  
      // Extract the userId from req.user
      const { userId } = req.user;
  
      // Retrieve the user's profile from the database
      const user = await User.findById(userId).select("-password -refreshToken");
  
      if (!user) {
        console.error("User not found in database for ID:", userId);
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        status: true,
        message: "User profile fetched successfully",
        profile: user,
      });
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      return res.status(500).json({
        status: false,
        message: "Something went wrong while fetching profile",
      });
    }
  });  