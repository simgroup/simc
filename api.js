const schema = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
const OTP = require('../commanFunction/func');








module.exports = {

    //.........................................................signUpApi.................................................//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    signUp: (req, res) => {
        console.log('i Am here    ');
        try {
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.Mob_Number) 8001
                return res.send({ responseCode: 404, responseMessage: "Fill the required fields" 8001
            }
            else
                schema.findOne({ email: req.body.email }, (error, result) => {
                    console.log('i Am here    ',result);
                    if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server8001error", data: error })
                    }
                    else if (result) {
                        return res.send({ responseCode: 404, responseMessage: " Email already exist" })
                    }
                    else {
                        schema.findOne({ Mob_Number: req.body.Mob_Number }, (error, result2) => {
                            console.log('i Am here    ',error,result2);
                            if (error) {
                                return res.send({ responseCode: 500, responseMessage: "Internal server error", data: error })
                            } else if (result2) {
                                return res.send({ responseCode: 200, responseMessage: " Mobile number already exist" })
                            }
                            else {
                                otp1 = OTP.getOTP();
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'arjunsinghyed@gmail.com',
                                        pass: 'Arjun@123'

                                    }
                                });
                                port: 587,
                                    'smtp@gmail.com'

                                var mailOptions = {
                                    from: 'arjunsinghyed@gmail.com',
                                    to: req.body.email,
                                    subject: 'Sending Email using Node.js',
                                    text: 'That was easy! ' + otp1
                                };

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                let salt = bcrypt.genSaltSync(10);
                                req.body.password = bcrypt.hashSync(req.body.password, salt)
                                var obj = new schema({
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: req.body.password,
                                    Mob_Number: req.body.Mob_Number,
                                    OTP: otp1,
                                })
                                obj.save((err1, succ) => {
                                    console.log('i Am here    ',err1,succ);

                                    if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server Error", err1 })
                                    }
                                    else if (!succ) {
                                        return res.send({ responseCode: 404, responseMessage: "not found" })
                                    }
                                    else if (succ.OTP) {
                                        return res.send({ responseCode: 200, responseMessage: "saved Successfuly", data: succ })
                                    }
                                    else {
                                        return res.send({ responseCode: 404, responseMessage: "OTP not found" })
                                    }

                                })
                            }
                        })
                    }

                })


        } catch (Error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }

    },
    //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,verification Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    verifyUser: (req, res) => {
        console.log("i am here >>> 103");
        try {
            console.log("i am here >>> 103");
            if (!req.body.OTP || !req.body.email) {
                console.log("i am here >>> 103", req.body.OTP, req.body.email);
                return res.send({ responseCode: 404, responseMessage: "Fill the required fields" })
            } else {
                schema.findOne({ email: req.body.email }, (err, data1) => {
                    console.log('i Am here    ',data1,err)
                    if (err) {
                        return res.send({ responseCode: 404, responseMessage: "Your email not found" })
                    }
                    else if (data1) {
                        console.log("i am here >>> 103", data1.email)
                        if (req.body.OTP == data1.OTP) {
                            if (data1.verifyOtp == false) {
                                schema.updateOne({ verifyOtp: data1.verifyOtp }, { $set: { verifyOtp: true, emailVerified: true } }, (err, result2) => {
                                    console.log('i Am here    ',result2);
                                    if (err) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal Server Error" })
                                    }
                                    else {
                                        if (result2.n >= 0) {
                                            return res.send({ responseCode: 200, responseMessage: "OTP successfully verified", data: result2 })
                                        } else {
                                            return res.send({ responseCode: 200, responseMessage: "OTP not verified", data: result2 })
                                        }

                                    }
                                })

                            } else {
                                return res.send({ responseMessage: "Otp Allready Verified" })

                            }
                        } else {
                            return res.send({ responseCode: 500, responseMessage: "incorrect Otp" })

                        }
                    }
                    else {
                        return res.send({ responseCode: 504, responseMessage: "your email not found" })
                    }
                })
            }

        } catch (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
    },
    //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,resendOTPApi,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    resendOtp: (req, res) => {
        try {
            if (!req.body.email) {
                return res.send({ responseCode: 404, responseMessage: "Fill the required fields" })
            } else {
                schema.findOne({ email: req.body.email }, (err, result) => {
                    console.log('i Am here    ',result);
                    if (err) {
                        return res.send({ responseCode: 404, responseMessage: "Your email not found" })
                    }
                    else if (result) {
                        otp1 = OTP.getOTP();
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'arjunsinghyed@gmail.com',
                                pass: 'Arjun@123'

                            }
                        });
                        port: 587,
                            'smtp@gmail.com'

                        var mailOptions = {
                            from: 'arjunsinghyed@gmail.com',
                            to: req.body.email,
                            subject: 'Sending Email using Node.js',
                            text: 'That was easy! ' + otp1
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        schema.updateOne({ OTP: result.OTP }, { $set: { OTP: otp1 } }, (err, result) => {
                            console.log('i Am here    ',result);
                            if (err) {
                                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else if (result.n >= 0) {
                                return res.send({ responseCode: 200, responseMessage: "Resend OTP successfully ", data: result })
                            } else {
                                return res.send({ responseCode: 404, responseMessage: "OTP not send ", data: result })
                            }
                        })

                    } else {
                        return res.send({ responseCode: 404, responseMessage: "Your email not found" })
                    }

                })
            }

        } catch (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
    },
    //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,forgotPassword,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
   forgotPassword: (req,res)=>{
    console.log('i Am here  214  ');
       try{

           if(!req.body.email){
            return res.send({ responseCode: 404, responseMessage: "Fill the required fields" })
           }
          
           else{
               schema.findOne({email:req.body.email},(err,result)=>{
                console.log('i Am here    ',result);
                   if(err){
                    return res.send({ responseCode: 404, responseMessage: "Inncorrect Email ID" })
                   }
                   else {
                    otp1 = OTP.getOTP();
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'arjunsinghyed@gmail.com',
                            pass: 'Arjun@123'

                        }
                    });
                    port: 587,
                        'smtp@gmail.com'

                    var mailOptions = {
                        from: 'arjunsinghyed@gmail.com',
                        to: req.body.email,
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy! ' + otp1
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    schema.updateOne({OTP: result.OTP},{$set: {OTP: otp1}},(err,result2)=>{
                        console.log('i Am here    ',result2);
                        if(err){
                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }else if(result2.n>=0){
                            return res.send({ responseCode: 200, responseMessage: "OTP send your Email",data:result2 })
                        }
                        else{
                            return res.send({ responseCode: 500, responseMessage: "Internal server error",data:result2 })
                        }
                    })


                   }
               })
           }

       }catch(error){
        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
       }
   },
   //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,loginApi,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
   logIn: (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.send({ responseCode: 500, responseMessage: "internal server error" })
        }
        else {
            schema.findOne({ email: req.body.email }, (err, succ) => {
                console.log('i Am here    ',succ);
                if (err) {
                   
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", data: err })
                }
                else if (succ) {
                    var check = bcrypt.compareSync(req.body.password, succ.password);

                    if (check) {
                        if(succ.verifyOtp){
                            if(succ.status=="unblocked"){
                                return res.send({ responseCode: 200, responseMessage: "login successfully", data: succ })
                            }else{
                                return res.send({responseCode:401, responseMessage: " you are blocked "})
                            }
                          
                        }else{
                            return res.send({responseCode:401, responseMessage: " please verify your Account!!!! "})
                        }                       
                    }
                    else {
                      return  res.send({ responseCode: 404, responseMessage: "Password does not match" })

                    }
                }
                else{
                  return  res.send({responseCode: 404, responseMessage: "email does not match"})
                }

            })
        }
    } catch (error) {
       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
    }


},
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,countUserApi,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    countUser: (req,res)=>{
        try{
            schema.countDocuments({verifyOtp:true},(err,result)=>{
              if(err){
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }else{
                  console.log("result :  ",result)
                  return res.send({responseCode:200, responseMessage:"countOf USER",result})

              }
            })

        }catch(error){
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
    },
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
}