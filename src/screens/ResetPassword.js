import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { tempUser } from "../store/actions/actions"
import { bindActionCreators } from 'redux'
import apiRequest from "../apiServices/services"
import Loader from "../assets/loader/Loader"


class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            succesfull: false,
            buttonMessage: "Send OTP!",
            isLoading:false

        }
    }
    submitHandle = () => {
        console.log("INSIDE SUBmit BUtton ", this.state)
        this.setState({isLoading:true
        })
        localStorage.setItem("tempUser",true)
        this.api()
        
    }
    handleFieldChange(event, type) {
        switch (type) {
            case ("email"):
                if (event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    this.setState({ email: event.target.value })
                }
        }
    }   

    api() {
        var reqData = {
            "email": this.state.email,
        }
        apiRequest(reqData, "/forgotPassword", "POST")
            .then(data => {
                console.log(data.data)
                if (data.data.responseCode != "200") {
                    this.setState({ 
                        failed: true,
                        succesfull: false,
                        response: data.data.responseMessage ,
                        isLoading:false
                    })
                }
                else if (data.data.responseCode == "200") {
                    this.props.action.tempUser(this.state.email)
                    this.setState({
                        failed: false,
                        succesfull: true,
                        response: data.data.responseMessage,
                        isLoading:false

                    })
                    setTimeout(
                        function () {
                            this.props.history.push("/otp")
                        }
                          .bind(this),
                        2500
                      );
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
                                <div className="right-menu bar">

                                    <div className="log-header">
                                        <Link className="btnheader " to="/login">Login</Link>
                                        <Link className=" btnheader1" to="/signup">Sign up</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="loginView">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="left-part full-part">
                                            <div className="logo-img">
                                                <img src={require("../assets/images/rectangle.png")} />
                                            </div>
                                            <h5 className="user-info"><b></b>Enter your email </h5>
                                            <input type="email" id="email" name="email" placeholder="Email" onChange={(data) => { this.handleFieldChange(data, "email") }} />
                                            {this.state.failed ?
                                                <div style={{ color: "red" }}>
                                                    <h6 >
                                                        {this.state.response}</h6>
                                                </div>
                                            : null}
                                            {this.state.succesfull ?
                                                <div style={{ color: "green" }}>
                                                    <h6 >
                                                        {this.state.response}. Redirecting...</h6>
                                                </div>
                                            : null}
                                                 <div className="uppdte mt-4">
                                                    <button type="submit" onClick={() => this.submitHandle()}>Send OTP!</button>
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
        // data:state.data
        isLoggeIn: state.isLoggeIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators({ tempUser }, dispatch)
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
