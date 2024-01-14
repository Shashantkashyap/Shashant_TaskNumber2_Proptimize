const User = require("./model/User");
const express = require("express")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const OTP = require("./model/OTP")
const bcrypt = require("bcrypt")
const key = process.env.JWT_SECRET;
const otpGenerator = require("otp-generator");


router.post("/signup",
[
    body("email", "email is not valid").isEmail(),
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { firstName, lastName, email, password, confirmPassword, address, contact, otp } = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(404).json({
            success: false,
            message:"You should filled required fields"
        })
    };

    
    if(password !== confirmPassword){
        return res.status(404).json({
            success: false,
            message:"Password and confirm Password not matched"
        })
    }

    const check_email =await User.findOne({email});
    
    if(check_email){
      return res.status(400).json({success:false, message:  " User already registered"})
    };

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    //console.log("recentOTP is", recentOtp);

    console.log("recent otp", recentOtp[0].otp);

    console.log(otp, "OTP");

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });

    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          address,
          contact,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        user.password = undefined;

        const payload = {
          email: user.email,
          id: user._id,
          accountType:user.accountType
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn:"2h"
      });

      user.token = token;
      user.password = undefined;

      
        
        return res.json({ success: true, message: "User created", user , token });
      } catch (err) {
        console.log("error in creating user" + err);
  
      }
});

router.post("/login",
[
    body("email", "email is not valid").isEmail(),
    
  ],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({
            success: false,
            message:"You should filled required fields"
        })
    };

    try{
        const user = await User.findOne({email});
    console.log(user)
    if(!user){
      return res.status(400).json({success:false, message:  " User not registered yet"})
    };

    if(await bcrypt.compare(password, user.password)){
        const payload = {
            email: user.email,
            id: user._id,
            accountType:user.accountType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"2h"
        });

        user.token = token;
        user.password = undefined;

        const option = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }

        res.cookie("token",token,option).json({
            success:true,
            token,
            user,
            message:"Logged in successfully"
        })
    }
    }catch(err){
        console.log("Error in user login");
        error: err
    }

  });

  router.post("/otp", async (req, res) => {
    try {
      const { email } = req.body;
      
      const checkUserPresent = await User.findOne({ email });
      
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User already registered",
        });
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
  
      
      
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
  
        
      const otpPayload = { email, otp };
      console.log(otpPayload)
  
      const otpBody = await OTP.create(otpPayload);
      
      res.status(200).json({
        success: true,
        message: "otp sent successfully",
        otp,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error in sending OTP",
      });
    }
  })


module.exports = router ; 
