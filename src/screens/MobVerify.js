import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { tempUser } from "../store/actions/actions"
import { bindActionCreators } from 'redux'
import apiRequest from "../apiServices/services"
import Loader from "../assets/loader/Loader"


class MobOTP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            otp: "",
            failed: false,
            otpSubmited: false,
            resendOtp: false,
            isLoading:false
            
        }
        this.localStorage = (JSON.parse(localStorage.getItem("userData")))
    }
    handleFieldChange(event, type) {
        switch (type) {
            case ("OTP"):
                this.setState({ otp: event.target.value })
        }
    }

    apiResendOtp() {
        this.setState({isLoading:true})
        var reqData = {
            "Mob_Number": this.localStorage.userData.Mob_Number
        }
        apiRequest(reqData, "/resendOtp", "POST")
            .then(data => {
                console.log(data.data)
                if (data.data.responseCode != "200") {
                    this.setState({ failed: true,
                                    otpSubmited:false,
                                    resendOtp: false,
                                    response: data.data.responseMessage,
                                    isLoading:false })

                }
                else if (data.data.responseCode == "200") {
                    this.setState({
                        failed: false,
                        otpSubmited:false,
                        resendOtp: true,
                        response: data.data.responseMessage,
                        isLoading:false
                    })
                }
                else {
                    console.log("Invalid Case")
                }
            }
            )
    }

    submitOtp() {
        var reqData = {
            "Mob_Number": this.localStorage.userData.Mob_Number,
            "OTP": this.state.otp
        }
        this.setState({
            failed: false,
            otpSubmited:false,
            resendOtp: false,
            response: "",
            isLoading:true
        })
        apiRequest(reqData, "/verifyUser", "POST")
            .then(data => {
                // console.log(data.data)
                // console.log(this.localStorage.userData)
                if (data.data.responseCode != "200") {
                    this.setState({ failed: true, 
                                    resendOtp: false,                         
                                    otpSubmited: false,
                                    response: data.data.responseMessage,
                                    isLoading:false })

                }
                else if (data.data.responseCode == "200") {
                    this.setState({
                        failed: false,
                        resendOtp: false,                         
                        otpSubmited: true,
                        response: data.data.responseMessage,
                        isLoading:false

                    })
                    if(data.data.responseMessage==="OTP successfully verified"){
                        localStorage.setItem("otpVerified",true)
                        var userData = { ...this.localStorage, "userData": {...this.localStorage.userData,"verifyMob":true} }
                        localStorage.setItem('userData', JSON.stringify(userData))
                        setTimeout(
                            function () {
                                this.props.history.push("/viewprofile")
                            }
                              .bind(this),
                            2500
                          );
                    }
                }
                else {
                    console.log("Invalid Case")
                }
            }
            )
    }

    render() {
        return (
            <div className="remove">                
            {this.state.isLoading?<Loader/>:null}

                <main className="main-cover">
                    <section className="rightside styling">
                        <div className="tab-section">
                            <div className="header-prat styleHead accesDtn">
                                <ul className="nav" id="myTab" role="tablist">
                                    <li className="nav-item stykl">
                                        <img src={require("../assets/images/rectangle.png")} />
                                    </li>
                                </ul>
                                <div className="log-header">

                                </div>
                            </div>
                            <div className="loginView">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="left-part full-part">
                                            <div className="logo-img">
                                                <img src={require("../assets/images/rectangle.png")} />
                                            </div>
                                            <h6 className="user-info"><b></b>Enter OTP</h6>
                                            <input type="email" id="email" name="email" placeholder="OTP" onChange={(data) => { this.handleFieldChange(data, "OTP") }} />
                                            {this.state.failed ?
                                                <div style={{ color: "red" }}>
                                                    <h6 >
                                                        {this.state.response}</h6>
                                                </div>
                                                : null}
                                            {this.state.resendOtp ?
                                                <div style={{ color: "green" }}>
                                                    <h6 >
                                                        {this.state.response}.</h6>
                                                </div>
                                                : null}
                                            {this.state.otpSubmited ?
                                                <div style={{ color: "green" }}>
                                                    <h6 >
                                                        {this.state.response}. Redirecting...</h6>
                                                </div>
                                                : null} 
                                                <span className="psw" style={{fontSize:"12px"}}>
                                                    <u><div to="/resetPassword" className="passwordSet" onClick={() => this.apiResendOtp() }>Resend OTP</div></u>
                                                </span>
                                                <div>
                                                    <div className="uppdte mt-4">
                                                        <button type="submit"
                                                            onClick={() => this.submitOtp()}
                                                        >Verify</button>
                                                    </div>
                                                </div>
                                                
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bulding">
                                            <img src={require("../assets/images/aeroplane.png")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggeIn: state.isLoggeIn,
        tempUser:state.tempUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators({ tempUser }, dispatch)
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobOTP);
