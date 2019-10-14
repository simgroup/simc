var jwt = require('jsonwebtoken');
const schema = require('../models/userModel');
const auth = {
    adminToken: (req, res, next) => {
        console.log("token verified")
        if (req.headers.token) {
            jwt.verify(req.headers.token, 'tronblockchain', (err, result) => {
                if (err) {
                    console.log("token error======================>", err);
                    res.send({ responseCode: 500, responseMessage:  err })
                }
                else if (!result) {
                   res.send({responseCode:404, responseMessage:"Token is wrong"})
                }
                
                else {
                    console.log("Verify token result: ==========", result);
                    
                            console.log("token verified")
                            next();
                        
                    
                    
                }
            })
        } else {
            res.send({ response_code: 400, response_message: "Please provide token" })
        }
    }
}
module.exports = auth