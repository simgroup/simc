const express = require('express');
const nodemailer = require('nodemailer');
const userEmail = require('../controller/tronController');

const cloudinary = require('cloudinary');
cloudinary.config({
    "cloud_name": "simgroup",
    "api_key": "883627821753174",
    "api_secret": "bARkNPkv-McTSejBRgt8gJCA0dE" 
                  
    });



module.exports ={

    //....................................................getOTP..........................................................
    getOTP: () => {
        var val = Math.floor(100000 + Math.random() * 900000);
        //console.log("value==>>", val);
        console.log("Requested OTP is :", val);
        return val;
    },


    uploadImage: function (base64, callback) {
        cloudinary.v2.uploader.upload(base64, (err, result1) => {
        console.log("im in cloudinary>>>>>>>>>>>>>>>>>>>", result1)
       if(err){
           callback(err);
       }
        else if (result1.secure_url) {
        console.log("im in cloudinary111111111111", result1)
        callback(null, result1.secure_url)
        }
        else {
        callback(true, null);
        }
        })
        },

       
        //..................................................OTP..............................................................

        otp: function(to_mob, callback) {
            console.log("to_mobile:  ========>>>>>", to_mob);
            const accountSid = 'AC759181daf3ce72f3734996a8054420f9';
            const authToken = 'bf7d48178fc93031d58851c770459839';
            const client = require('twilio')(accountSid, authToken);
            var val = Math.floor(100000 + Math.random() * 900000);
            //console.log("value==>>", val);
            console.log("Requested OTP is :", val);
        
            client.messages
                .create({
                    body: "OTP to verify Mobile Number is: "+val,
                    from: '+16144272033',
                    to: to_mob
                })
                .then(message => console.log(message)).catch(err => {
                    console.log("dddf", err)
                 
                })
            callback(null, val);
        },

       //................................................mailer...........................................................
       
        mailer: function(to_mail,text, callback){
            transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'no-arjunsingh@mobiloitte.com',
                pass: 'Mobiloitte1'
            }
        });
        port: 587,
            'smtp@gmail.com'
        var mailOptions = {
            from: 'no-arjunsigh@mobiloitte.com',
            to: to_mail,
            subject: 'TRON Application',
            text: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                callback(error, null);
            } else {
                console.log('Email sent' + info.response);
            
            callback(error, info);
            }
        });
       
    },


    //...............................................................................................................

   



}