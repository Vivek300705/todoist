import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apierror.js"; // Ensure ApiError is imported correctly
import jwt from "jsonwebtoken";
import User from "../model/users.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT and extract user data
const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "").trim();
  
      if (!token) {
        throw new ApiError("Unauthorized: No token provided", 401);
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      console.log("Decoded token:", decodedToken); // Debugging decoded token
  
      req.user = { userId: decodedToken.userId }; // Attach userId from token to req.user
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
