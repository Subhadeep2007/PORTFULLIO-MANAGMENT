import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

import generateOTP from "../../utils/generateOTP.js";
import sendEmail from "../../utils/sendEmail.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../../utils/generateToken.js";


// ===============================
// REGISTER USER
// ===============================

const registerUser = async({
    name,
    email,
    password
}) => {

    const existingUser =
        await User.findOne({ email });

    if (existingUser) {
        throw new Error(
            "User with this email already exists"
        );
    }

    const hashedPassword =
        await bcrypt.hash(password, 12);

    const otp = generateOTP();

    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );

    const user = await User.create({
        name,
        email,
        password: hashedPassword,

        // IMPORTANT:
        // Public registration always creates USER
        role: "user",

        emailVerificationOTP: otp,
        emailVerificationOTPExpire: otpExpire
    });

    await sendEmail({
        to: email,

        subject: "Verify your Portfolio Builder account",

        html: `
            <h2>Welcome to Portfolio Builder</h2>

            <p>Hello ${name},</p>

            <p>
                Your email verification OTP is:
            </p>

            <h1>${otp}</h1>

            <p>
                This OTP will expire in 10 minutes.
            </p>

            <p>
                If you did not create this account,
                you can ignore this email.
            </p>
        `
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
    };
};


// ===============================
// VERIFY EMAIL
// ===============================

const verifyEmail = async({
    email,
    otp
}) => {

    const user =
        await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isEmailVerified) {
        throw new Error(
            "Email is already verified"
        );
    }

    if (!user.emailVerificationOTP) {
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
        user.emailVerificationOTP !== otp
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
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
    };
};


// ===============================
// RESEND VERIFICATION OTP
// ===============================

const resendVerificationOTP = async(
    email
) => {

    const user =
        await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.isEmailVerified) {
        throw new Error(
            "Email is already verified"
        );
    }

    const otp = generateOTP();

    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );

    user.emailVerificationOTP = otp;
    user.emailVerificationOTPExpire =
        otpExpire;

    await user.save();

    await sendEmail({
        to: email,

        subject: "Your new Portfolio Builder verification OTP",

        html: `
            <h2>Portfolio Builder</h2>

            <p>Hello ${user.name},</p>

            <p>
                Your new verification OTP is:
            </p>

            <h1>${otp}</h1>

            <p>
                This OTP will expire in 10 minutes.
            </p>
        `
    });

    return {
        email: user.email
    };
};


// ===============================
// LOGIN
// ===============================

const loginUser = async({
    email,
    password
}) => {

    const user =
        await User.findOne({ email });

    if (!user) {
        throw new Error(
            "Invalid email or password"
        );
    }

    if (!user.isActive) {
        throw new Error(
            "Your account is inactive"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new Error(
            "Invalid email or password"
        );
    }

    // Email verification
    if (!user.isEmailVerified) {

        const otp = generateOTP();

        const otpExpire =
            new Date(
                Date.now() + 10 * 60 * 1000
            );

        user.emailVerificationOTP = otp;

        user.emailVerificationOTPExpire =
            otpExpire;

        await user.save();

        await sendEmail({
            to: user.email,

            subject: "Verify your Portfolio Builder account",

            html: `
                <h2>Portfolio Builder</h2>

                <p>Hello ${user.name},</p>

                <p>
                    Your verification OTP is:
                </p>

                <h1>${otp}</h1>

                <p>
                    This OTP will expire in
                    10 minutes.
                </p>
            `
        });

        return {
            requiresEmailVerification: true,
            email: user.email
        };
    }

    // Generate tokens
    const accessToken =
        generateAccessToken(
            user._id.toString(),
            user.role
        );

    const refreshToken =
        generateRefreshToken(
            user._id.toString(),
            user.role
        );

    user.refreshToken = refreshToken;

    user.lastSeen = new Date();

    await user.save();

    return {
        requiresEmailVerification: false,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified
        },

        accessToken,
        refreshToken
    };
};


// ===============================
// REFRESH ACCESS TOKEN
// ===============================

const refreshAccessToken = async(
    refreshToken
) => {

    if (!refreshToken) {
        throw new Error(
            "Refresh token not found"
        );
    }

    const user =
        await User.findOne({
            refreshToken
        });

    if (!user) {
        throw new Error(
            "Invalid refresh token"
        );
    }

    if (!user.isActive) {
        throw new Error(
            "Your account is inactive"
        );
    }

    try {

        const decoded =
            jwt.verify(
                refreshToken,
                process.env.JWT_SECRET
            );

        if (
            decoded.userId !==
            user._id.toString()
        ) {
            throw new Error(
                "Invalid refresh token"
            );
        }

        const accessToken =
            generateAccessToken(
                user._id.toString(),
                user.role
            );

        return {
            accessToken
        };

    } catch (error) {

        throw new Error(
            "Invalid or expired refresh token"
        );
    }
};


// ===============================
// LOGOUT
// ===============================

const logoutUser = async(
    refreshToken
) => {

    if (!refreshToken) {
        return;
    }

    await User.findOneAndUpdate({ refreshToken }, {
        $set: {
            refreshToken: null
        }
    });
};


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotPassword = async(
    email
) => {

    const user =
        await User.findOne({ email });

    if (!user) {
        return;
    }

    if (!user.isActive) {
        return;
    }

    const otp = generateOTP();

    const otpExpire =
        new Date(
            Date.now() + 10 * 60 * 1000
        );

    user.resetPasswordOTP = otp;

    user.resetPasswordOTPExpire =
        otpExpire;

    await user.save();

    await sendEmail({
        to: email,

        subject: "Portfolio Builder password reset OTP",

        html: `
            <h2>Portfolio Builder</h2>

            <p>Hello ${user.name},</p>

            <p>
                Your password reset OTP is:
            </p>

            <h1>${otp}</h1>

            <p>
                This OTP will expire in
                10 minutes.
            </p>
        `
    });
};


// ===============================
// RESET PASSWORD
// ===============================

const resetPassword = async({
    email,
    otp,
    newPassword
}) => {

    const user =
        await User.findOne({ email });

    if (!user) {
        throw new Error(
            "Invalid reset request"
        );
    }

    if (!user.resetPasswordOTP) {
        throw new Error(
            "Reset OTP not found"
        );
    }

    if (!user.resetPasswordOTPExpire ||
        user.resetPasswordOTPExpire <
        new Date()
    ) {
        throw new Error(
            "Reset OTP has expired"
        );
    }

    if (
        user.resetPasswordOTP !== otp
    ) {
        throw new Error(
            "Invalid reset OTP"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            12
        );

    user.password = hashedPassword;

    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpire = null;

    // Logout all existing sessions
    user.refreshToken = null;

    await user.save();

    return {
        email: user.email
    };
};


// ===============================
// CHANGE PASSWORD
// ===============================

const changePassword = async({
    userId,
    currentPassword,
    newPassword
}) => {

    const user =
        await User.findById(userId);

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new Error(
            "Current password is incorrect"
        );
    }

    const isSamePassword =
        await bcrypt.compare(
            newPassword,
            user.password
        );

    if (isSamePassword) {
        throw new Error(
            "New password must be different from current password"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            12
        );

    user.password = hashedPassword;

    user.refreshToken = null;

    await user.save();
};


export {
    registerUser,
    verifyEmail,
    resendVerificationOTP,
    loginUser,
    refreshAccessToken,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword
};