
// const User = require('../models/userModel');
const userModel = require('../models/userModel');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

// const sendOtp = require('../service/sendOtp');

//code for registration
const createUser = async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt);

        const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            phone: phone,
        });

        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

//code for login


const login = async (req, res) => {

    //1. Check incoming data
    console.log(req.body);

    //2. Destructure the incoming data
    const { email, password } = req.body;

    //3. Validate the data (if empty, stop the process & send res)
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Please enter all fields!"
        })

    }

    //4. Error handling (try/catch)

    //5.1 If username and password don't match-> send response 
    try {

        // find user 

        const findUser = await userModel.findOne({ email: email });

        if (!findUser) {
            return res.status(400).json({
                "success": false,
                "message": "user with this email doesn't exist"
            })
        }

        //compare password
        const isValidPassword = await bcrypt.compare(password, findUser.password)

        if (!isValidPassword) {
            return res.status(400).json({
                "success": false,
                "message": "Password doesn't match"
            })
        }

        //token (Generate- User data + key)
        const token = await jwt.sign(
            { id: findUser._id },
            process.env.JWT_SECRET
        )

        //5.1 If login successful send response
        //5.1.1 stop the process
        console.log(token)
        return res.status(200).json({
            success: true,
            message: "user login successful",
            "token": token,
            "userData": { findUser }
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Internal server error!"
        })
    }
}

// //forgot password by usign phone Number
// const forgotPassword = async (req, res) => {
//     const { phone } = req.body;

//     if (!phone) {
//         return res.status(400).json({
//             'success': false,
//             'message': 'provide your phone number'
//         })
//     }
//     try {

//         //finding user
//         const user = await userModel.findOne({
//             phone: phone

//         })
//         if (!user) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'user with this phone number is not found'
//             })
//         }

//         //generate random 6 digit otp 
//         const otp = Math.floor(10000 + Math.random() * 900000)

//         //generate expirty date
//         const expiryDate = Date.now() + 36000;

//         //save to database for verification
//         user.resetPasswordOtp = otp;
//         user.resetPasswordExpires = expiryDate;

//         await user.save();

//         //send to registered phone number
//         const isSent = await sendOtp(phone, otp)

//         if (!isSent) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': "Error sending OTP code"
//             })
//         }

//         return res.status(200).json({
//             'success': true,
//             'message': "OTP sent successfully"
//         })


//     } catch (error) {
//         return res.status(500).json({
//             'success': false,
//             'message': 'server error'
//         })

//     }
// }


// //verify otp and send new password
// const verifyOtpAndSetPassword = async (req, res) => {

//     const { phone, otp, newPassword } = req.body;
//     if (!phone || !otp || !newPassword) {
//         return res.status(400).json({
//             'success': false,
//             'message': 'Required fields are missing!'
//         })
//     }

//     try {
//         const user = await userModel.findOne({ phone: phone })
//         //verify otp 
//         if (user.resetPasswordOtp != otp) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'Otp is invalid'
//             })
//         }
//         if (user.resetPasswordExpires < Date.now) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'Otp has expired'
//             })
//         }
//         const randomSalt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(newPassword, randomSalt)
//         user.password = hashedPassword
//         await user.save()

//         //response
//         res.status(200).json({
//             'success': true,
//             'message': 'OTP verified and password updated'
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             'success': false,
//             'message': 'Server error'
//         })

//     }


// }


//Exporting the function 
module.exports = {
    createUser,
    login,
    // forgotPassword,
    // verifyOtpAndSetPassword
};
