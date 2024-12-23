import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apierror.js";
import jwt from "jsonwebtoken";
import User from "../model/users.js";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new ApiError("Unauthorized: No token provided", 401);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Optionally fetch full user object
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    req.user = { userId: user._id, email: user.email }; // Attach user details to req.user
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError("Access token expired", 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError("Invalid token", 401);
    } else {
      throw new ApiError(error.message || "Unauthorized access", 401);
    }
  }
});

export default verifyJWT;
