import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { tempUser } from "../store/actions/actions"
import { bindActionCreators } from 'redux'
import apiRequest from "../apiServices/services"
import Loader from "../assets/loader/Loader"


class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:"",
            oldPassword:"",
            newPassword:"",
            confPassword:"",
            isLoading:false
        }
        this.localStorage= JSON.parse(localStorage.getItem("userData"))
    }
    
    handleFieldChange(event, type) {
        switch (type) {
          case ("OldPassword"):
            if (event.target.value.length > 8) {
              this.setState({ oldPassword: event.target.value, })
            }
            break
            case ("newPassword"):
                this.setState({newPassword:event.target.value})
                if (this.state.newPassword.length<8){
                 this.setState({passwordResponse:"Password too short"}) 
                }
                else if (event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
                  this.setState({passwordResponse:""})
                }
                else{
                  this.setState({passwordResponse:"Must contain Special/Upper/Lower character and Number.."})
                }
                break;
          case ("confPassword"):
            if (event.target.value === this.state.newPassword) {
              this.setState({ confPassword: event.target.value })
            }

            break;
        }
        console.log("event clicked", event.target.value, type)
        console.log(this.state)

      }

      handleSubmit(){
          this.setState({
            failed: false,                        
            succesfull: false,
            isLoading:false
          })
        this.api()
      }
      api() {
        var reqData = {
            "username": this.localStorage.userData.username,
            "oldPassword":this.state.oldPassword,
            "newPassword": this.state.newPassword,
            "confirmPassword":this.state.confPassword
        
        }
        console.log(reqData)
        apiRequest(reqData, "/changePassword", "POST",this.localStorage.authToken)
            .then(data => {
                console.log(data)
                if (data.data.responseCode != "200") {
                    this.setState({ failed: true,                        
                                    succesfull: false,
                                    response: data.data.responseMessage,
                                    isLoading:false
                                })
                }
                else if (data.data.responseCode == "200") {
                    switch(data.data.responseMessage){
                        case("Incorrect Old Password"):
                        this.setState({
                            response: data.data.responseMessage,
                            isLoading:false
                        })
                        break;
                        case("Record Updated Successfully"):
                        this.setState({
                            failed: false,                        
                            succesfull: true,
                            response: data.data.responseMessage,
                            isLoading:false

                        })
                        setTimeout(
                            function () {
                            this.props.history.push("/viewprofile")
                            }
                            .bind(this),
                            5000
                        );
                        break;
  
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
                <main className="main-cover">
                    <section className="rightside styling">
                        <div className="tab-section">
                            <div className="header-prat styleHead accesDtn" style={{ paddingRight: "80px" }}>
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
                                            <h5 className="user-info"><b></b> Password</h5>
                                            <p className="resetpass"> Create a new password  so that you can access SimGroup</p>
                                            <form >
                                                <h6 className="creat">OLD PASSWORD</h6>
                                                <input type="password" id="createPassword" name="createPassword" placeholder="Old Password" 
                                                onChange={(event) => { this.handleFieldChange(event, "OldPassword") }} />
                                                   {this.state.failed ?
                                                    <div style={{ color: "red" }}>
                                                    <h6 >
                                                        {this.state.response}</h6>
                                                    </div>
                                                    : null}
                                                <h6 className="creat">CREATE NEW PASSWORD</h6>
                                                <input type="password" id="createPassword" name="createPassword" placeholder="Create Password" 
                                                onChange={(event) => { this.handleFieldChange(event, "newPassword") }} />
                                                            {/* ValidationResponse */}                        
                                                    {this.state.passwordResponse!=""?
                                                    <div style={{ color: "orange" }}>
                                                    <h6 >{this.state.passwordResponse}</h6>
                                                    </div>
                                                    :null  
                                                }
                                                <h6 className="creat"> CONFIRM NEW PASSWORD</h6>
                                                <div className="holderpass">
                                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder=" Confirm Password" 
                                                onChange={(event) => { this.handleFieldChange(event, "confPassword") }} />
                                                </div>
                                            </form>
                                            {this.state.newPassword != this.state.confPassword ?
                                                <div style={{ color: "red" }}>
                                                    <h6 >Password Does Not Match!</h6>
                                                </div>
                                                : null
                                            }
                                            {this.state.succesfull?
                                                <div style={{ color: "green" }}>
                                                    <h6 >{this.state.response}</h6>

                                                </div>
                                                : null
                                            }

                                            <div className="uppdte mt-4">
                                                <button type="submit" onClick={()=>{this.handleSubmit()}}>Submit</button>
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

const mapStateToProps=(state)=>{
    return {
      tempUser:state.tempUser
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{

    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);
  