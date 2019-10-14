const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bcryptjs = require('bcryptjs');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
let userSchema = new Schema({

        username: {
            type: String
        },

        email: {
            type: String
        },

        password: {
            type: String
        },

        Mob_Number: {
            type: String
        },
        OTP_Mob: {
            type: Number
        },
        OTP_email: {
            type: Number
        },
        verifyEmail: {
            type: Boolean,
            default: false
        },
        verifyMob: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "Unblocked"
        },
       
        referralLink: {
            type: String,
        },
        referBy: {
            type: String,
        },
        referralBonus:{             
            type: String,
        },

        image: {
            type: String,
        },

        facebook: {
            type: String,
        },

        twitter: {
            type: String,
        },

        Gmail: {
            type: String,
        },

        userType: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    
        
},
        {
            timestamps: true
        }
);
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('UserSchema', userSchema);

(function init() {
   
        

            let obj = {

                
                password: "Mobiloitte1",
                userType: "ADMIN",
                username: "Ridham",
                email: "cpp-ridham@mobiloitte.com"

            };

            // let salt = bcrypt.genSaltSync(10);
            obj.password = bcryptjs.hashSync(obj.password, 10)
            mongoose.model('userSchema', userSchema).findOne({ userType: "ADMIN" }, (err, result) => {
                if (err) console.log(" Admin created## ", err);
                else if (!result) {
                    mongoose.model('userSchema', userSchema).create(obj, (err, success) => {
                        if (err) console.log("Admin created@@@@", err);
                        else

                            console.log(" Admin created $$$$ ", success);
                    })
                } else {
                    console.log("Admin");
                }

            })
        })
        ();