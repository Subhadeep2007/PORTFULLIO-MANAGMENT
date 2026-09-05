import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../../models/user.model.js";


// ========================================
// HELPER FUNCTIONS
// ========================================


// Generate OTP
const generateOTP = () => {

    return crypto
        .randomInt(100000, 1000000)
        .toString();

};


// Generate Access Token
const generateAccessToken = (user) => {

    return jwt.sign({
            userId: user._id.toString(),
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "1d"
        }
    );

};


// Generate Refresh Token
const generateRefreshToken = (user) => {

    return jwt.sign({
            userId: user._id.toString(),
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    );

};


// ========================================
// USER REGISTER
// ========================================

const registerUser = async(data) => {

    const {
        name,
        email,
        password
    } = data;


    const normalizedEmail =
        email.toLowerCase().trim();


    // Check existing user
    const existingUser =
        await User.findOne({
            email: normalizedEmail
        });


    if (existingUser) {

        throw new Error(
            "An account with this email already exists"
        );

    }


    // Hash password
    const hashedPassword =
        await bcrypt.hash(password, 12);


    // Generate OTP
    const otp =
        generateOTP();


    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );


    // Create user
    const user =
        await User.create({

            name,

            email: normalizedEmail,

            password: hashedPassword,

            role: "user",

            isEmailVerified: false,

            emailVerificationOTP: otp,

            emailVerificationOTPExpire: otpExpire

        });


    /*
        IMPORTANT:

        Yahan tumhara existing
        email service call karna hoga.

        Example:

        await sendVerificationEmail(
            normalizedEmail,
            otp
        );
    */


    return {

        userId: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        isEmailVerified: user.isEmailVerified

    };

};


// ========================================
// ADMIN REGISTER
// ========================================

const registerAdmin = async(data) => {

    const {
        name,
        email,
        password,
        adminSecretKey
    } = data;


    // ========================================
    // CHECK ADMIN SECRET
    // ========================================

    if (!adminSecretKey ||
        adminSecretKey !==
        process.env.JWT_SECRET
    ) {

        throw new Error(
            "Invalid admin secret key"
        );

    }


    const normalizedEmail =
        email.toLowerCase().trim();


    // ========================================
    // CHECK EXISTING EMAIL
    // ========================================

    const existingUser =
        await User.findOne({
            email: normalizedEmail
        });


    if (existingUser) {

        throw new Error(
            "An account with this email already exists"
        );

    }


    // ========================================
    // CHECK EXISTING ADMIN
    // ========================================

    const existingAdmin =
        await User.findOne({
            role: "admin"
        });


    if (existingAdmin) {

        throw new Error(
            "An admin account already exists"
        );

    }


    // ========================================
    // HASH PASSWORD
    // ========================================

    const hashedPassword =
        await bcrypt.hash(password, 12);


    // ========================================
    // GENERATE OTP
    // ========================================

    const otp =
        generateOTP();


    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );


    // ========================================
    // CREATE ADMIN
    // ========================================

    const admin =
        await User.create({

            name,

            email: normalizedEmail,

            password: hashedPassword,

            role: "admin",

            isEmailVerified: false,

            emailVerificationOTP: otp,

            emailVerificationOTPExpire: otpExpire

        });


    /*
        Existing email service:

        await sendVerificationEmail(
            normalizedEmail,
            otp
        );
    */


    return {

        userId: admin._id,

        name: admin.name,

        email: admin.email,

        role: admin.role,

        isEmailVerified: admin.isEmailVerified

    };

};


// ========================================
// VERIFY EMAIL
// ========================================

const verifyEmail = async(data) => {

    const {
        email,
        otp
    } = data;


    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    if (!user) {

        throw new Error(
            "User not found"
        );

    }


    if (user.isEmailVerified) {

        throw new Error(
            "Email is already verified"
        );

    }


    if (!user.emailVerificationOTP ||
        !user.emailVerificationOTPExpire
    ) {

        throw new Error(
            "Verification OTP not found"
        );

    }


    if (
        user.emailVerificationOTPExpire <
        new Date()
    ) {

        throw new Error(
            "Verification OTP has expired"
        );

    }


    if (
        user.emailVerificationOTP !==
        otp
    ) {

        throw new Error(
            "Invalid verification OTP"
        );

    }


    user.isEmailVerified = true;

    user.emailVerificationOTP = null;

    user.emailVerificationOTPExpire = null;


    await user.save();


    return {

        userId: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        isEmailVerified: user.isEmailVerified

    };

};


// ========================================
// RESEND VERIFICATION OTP
// ========================================

const resendVerificationOTP = async(
    email
) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    if (!user) {

        throw new Error(
            "User not found"
        );

    }


    if (user.isEmailVerified) {

        throw new Error(
            "Email is already verified"
        );

    }


    const otp =
        generateOTP();


    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );


    user.emailVerificationOTP =
        otp;

    user.emailVerificationOTPExpire =
        otpExpire;


    await user.save();


    /*
        Existing email service:

        await sendVerificationEmail(
            normalizedEmail,
            otp
        );
    */


    return {

        email: user.email,

        message: "Verification OTP sent successfully"

    };

};


// ========================================
// USER LOGIN
// ========================================

const loginUser = async(data) => {

    const {
        email,
        password
    } = data;


    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    if (!user) {

        throw new Error(
            "Invalid email or password"
        );

    }


    // User cannot login as admin
    if (user.role !== "user") {

        throw new Error(
            "Please use admin login"
        );

    }


    if (!user.isActive) {

        throw new Error(
            "Your account has been deactivated"
        );

    }


    const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        );


    if (!passwordMatch) {

        throw new Error(
            "Invalid email or password"
        );

    }


    // Email verification
    if (!user.isEmailVerified) {

        const otp =
            generateOTP();


        user.emailVerificationOTP =
            otp;

        user.emailVerificationOTPExpire =
            new Date(
                Date.now() + 10 * 60 * 1000
            );


        await user.save();


        /*
            Existing email service:

            await sendVerificationEmail(
                user.email,
                otp
            );
        */


        return {

            requiresEmailVerification: true,

            email: user.email

        };

    }


    const accessToken =
        generateAccessToken(user);


    const refreshToken =
        generateRefreshToken(user);


    user.refreshToken =
        refreshToken;

    user.lastSeen =
        new Date();


    await user.save();


    return {

        user: {

            userId: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            profileImage: user.profileImage,

            isEmailVerified: user.isEmailVerified

        },

        accessToken,

        refreshToken

    };

};


// ========================================
// ADMIN LOGIN
// ========================================

const loginAdmin = async(data) => {

    const {
        email,
        password,
        adminSecretKey
    } = data;


    // ========================================
    // SECRET KEY CHECK
    // ========================================

    if (!adminSecretKey ||
        adminSecretKey !==
        process.env.JWT_SECRET
    ) {

        throw new Error(
            "Invalid admin secret key"
        );

    }


    const normalizedEmail =
        email.toLowerCase().trim();


    const admin =
        await User.findOne({
            email: normalizedEmail
        });


    if (!admin) {

        throw new Error(
            "Invalid admin credentials"
        );

    }


    // ========================================
    // ROLE CHECK
    // ========================================

    if (admin.role !== "admin") {

        throw new Error(
            "This account is not an admin account"
        );

    }


    if (!admin.isActive) {

        throw new Error(
            "Admin account is deactivated"
        );

    }


    // ========================================
    // PASSWORD CHECK
    // ========================================

    const passwordMatch =
        await bcrypt.compare(
            password,
            admin.password
        );


    if (!passwordMatch) {

        throw new Error(
            "Invalid admin credentials"
        );

    }


    // ========================================
    // EMAIL VERIFICATION
    // ========================================

    if (!admin.isEmailVerified) {

        const otp =
            generateOTP();


        admin.emailVerificationOTP =
            otp;

        admin.emailVerificationOTPExpire =
            new Date(
                Date.now() + 10 * 60 * 1000
            );


        await admin.save();


        /*
            Existing email service:

            await sendVerificationEmail(
                admin.email,
                otp
            );
        */


        return {

            requiresEmailVerification: true,

            email: admin.email

        };

    }


    // ========================================
    // TOKENS
    // ========================================

    const accessToken =
        generateAccessToken(admin);


    const refreshToken =
        generateRefreshToken(admin);


    admin.refreshToken =
        refreshToken;

    admin.lastSeen =
        new Date();


    await admin.save();


    return {

        user: {

            userId: admin._id,

            name: admin.name,

            email: admin.email,

            role: admin.role,

            profileImage: admin.profileImage,

            isEmailVerified: admin.isEmailVerified

        },

        accessToken,

        refreshToken

    };

};


// ========================================
// REFRESH ACCESS TOKEN
// ========================================

const refreshAccessToken = async(
    token
) => {

    if (!token) {

        throw new Error(
            "Refresh token is required"
        );

    }


    const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );


    const user =
        await User.findById(
            decoded.userId
        );


    if (!user) {

        throw new Error(
            "User not found"
        );

    }


    if (!user.isActive) {

        throw new Error(
            "Account is deactivated"
        );

    }


    if (
        user.refreshToken !== token
    ) {

        throw new Error(
            "Invalid refresh token"
        );

    }


    const accessToken =
        generateAccessToken(user);


    return {

        accessToken

    };

};


// ========================================
// LOGOUT
// ========================================

const logoutUser = async(
    refreshToken
) => {

    if (!refreshToken) {
        return;
    }


    try {

        const decoded =
            jwt.verify(
                refreshToken,
                process.env.JWT_SECRET
            );


        await User.findByIdAndUpdate(
            decoded.userId, {
                refreshToken: null
            }
        );

    } catch (error) {

        // Token already invalid/expired.
        // Logout should still succeed.

    }

};


// ========================================
// FORGOT PASSWORD
// ========================================

const forgotPassword = async(
    email
) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    /*
        Security:
        Don't reveal whether email exists.
    */

    if (!user) {
        return;
    }


    const otp =
        generateOTP();


    user.resetPasswordOTP =
        otp;

    user.resetPasswordOTPExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );


    await user.save();


    /*
        Existing email service:

        await sendPasswordResetEmail(
            user.email,
            otp
        );
    */

};


// ========================================
// RESET PASSWORD
// ========================================

const resetPassword = async(
    data
) => {

    const {
        email,
        otp,
        newPassword
    } = data;


    const normalizedEmail =
        email.toLowerCase().trim();


    const user =
        await User.findOne({
            email: normalizedEmail
        });


    if (!user) {

        throw new Error(
            "Invalid reset request"
        );

    }


    if (!user.resetPasswordOTP ||
        !user.resetPasswordOTPExpire
    ) {

        throw new Error(
            "Password reset OTP not found"
        );

    }


    if (
        user.resetPasswordOTPExpire <
        new Date()
    ) {

        throw new Error(
            "Password reset OTP has expired"
        );

    }


    if (
        user.resetPasswordOTP !== otp
    ) {

        throw new Error(
            "Invalid password reset OTP"
        );

    }


    user.password =
        await bcrypt.hash(
            newPassword,
            12
        );


    user.resetPasswordOTP =
        null;

    user.resetPasswordOTPExpire =
        null;

    user.refreshToken =
        null;


    await user.save();


    return {

        message: "Password reset successfully"

    };

};


// ========================================
// CHANGE PASSWORD
// ========================================

const changePassword = async({
    userId,
    currentPassword,
    newPassword
}) => {

    const user =
        await User.findById(
            userId
        );


    if (!user) {

        throw new Error(
            "User not found"
        );

    }


    const passwordMatch =
        await bcrypt.compare(
            currentPassword,
            user.password
        );


    if (!passwordMatch) {

        throw new Error(
            "Current password is incorrect"
        );

    }


    user.password =
        await bcrypt.hash(
            newPassword,
            12
        );


    // Invalidate existing refresh token
    user.refreshToken =
        null;


    await user.save();


    return true;

};


// ========================================
// EXPORTS
// ========================================

export {
    registerUser,
    registerAdmin,
    verifyEmail,
    resendVerificationOTP,
    loginUser,
    loginAdmin,
    refreshAccessToken,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword
};