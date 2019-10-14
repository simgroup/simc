import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/actions"
import { bindActionCreators } from 'redux'
import apiRequest from "../../apiServices/services"
import Loader from "../../assets/loader/Loader"


class SocialSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      Mob_Number: "",
      password: "",
      confPass: "",
      criticalPasswordStatus:false,
      passwordResponse:"",
      referralLink: "",
      failedFeild: false,
      succesfull: false,
      usernameStatus: false,
      emailStatus: false,
      phonenumberStatus: false,
      passwordEmpty: false,
      tnc: false,
      usernameLen: null,
      emailLen: null,
      PhoneLen: null,
      passLen: null,
      isLoading:false,
    }
  }

  //API HANDLERS
  api() {
    var reqData = {
      "username": this.state.username,
      "email": this.props.location.state.email,
      "password": this.state.password,
      // "Mob_Number": this.state.Mob_Number,
      "referralLink": this.state.referralLink!=""?this.state.referralLink:this.state.referralLink==""?"":window.location.href,
    }
    // if (this.state.password !== "") {

    // }
    apiRequest(reqData, "/signUp", "POST")
      .then(data => {
        console.log(data.data.responseCode)
        if (data.data.responseCode != "200") {
          this.setState({ response: data.data.responseMessage,isLoading:false })
          switch (data.data.responseMessage) {
            case ("Username Already Exist!"):
              this.setState({
                referallStatus:false,
                usernameStatus: true,
                emailStatus: false,
                phonenumberStatus: false,
                failedFeild: false,
                succesfull: false,
              })

              break;
            case ("Email Already Exist!"):
              this.setState({
                referallStatus:false,
                usernameStatus: false,
                emailStatus: true,
                phonenumberStatus: false,
                failedFeild: false,
                succesfull: false,
                isLoading:false 
              })

              break;
            case ("Mobile Number Already Exist!"):
              this.setState({
                referallStatus:false,
                usernameStatus: false,
                emailStatus: false,
                phonenumberStatus: true,
                failedFeild: false,
                succesfull: false,
                isLoading:false 
              })
              break;
            case ("Fill the required Fields"):
              this.setState({
                referallStatus:false,
                usernameStatus: false,
                emailStatus: false,
                phonenumberStatus: false,
                failedFeild: true,
                succesfull: false,
                isLoading:false 

              })
              break;
            case ("Saved Succesfully"):
              this.setState({
                referallStatus:true,
                usernameStatus: false,
                emailStatus: false,
                phonenumberStatus: false,
                failedFeild: false,
                succesfull: true,
                isLoading:false 

              })
              break;
              case ("Referral Link Not Found!"):
                console.log("dfghsdfghfdkgdhf")
                this.setState({
                  referallStatus:false,
                  usernameStatus: false,
                  emailStatus: false,
                  phonenumberStatus: false,
                  failedFeild: false,
                  succesfull: true,
                  isLoading:false 
  
                })

          }
        }
        else if (data.data.responseCode == "200") {
          this.props.action.signUp(data)
          this.setState({ signUpStatus: true, response: "Sign Up Succesfull! Redirecting..." ,isLoading:false })
          setTimeout(
            function () {
              this.props.history.push("/login")
            }
              .bind(this),
            5000
          );

        }
        else {
          console.log("Invalid Case")
        }

      }
      )

  }

  // HANDLING FINCTIONS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>STARS

  tncHandle = (e) => {
    this.props.history.push(e)
  }

  submitHandle = () => {
    console.log("this current state", this.state)
    this.setState({
      usernameStatus: false,
      emailStatus: false,
      phonenumberStatus: false,
      failedFeild: false,
      succesfull: false,
      passwordEmpty: false,
      signUpStatus: false,

      //length check
      usernameLen: this.state.username.length,
      emailLen: this.state.email.length,
      PhoneLen: this.state.Mob_Number.length,
      passLen: this.state.password.length,
    })
    console.log(this.state)
    if (this.state.password === this.state.confPass && this.state.password != "") {
      console.log(" password Samem state", this.state);
      this.setState({ passwordEmpty: false, passwordEmpty: false, response: "" , isLoading:true,})
      this.api()
    }
    else {
      this.setState({ passwordEmpty: true, response: "Please,Enter required Fields." ,})
      console.log("state", this.state);

    }
  }
  tncStatus() {
    this.setState({ tnc: !this.state.tnc })
  }

  handleFieldChange(event, type) {
    switch (type) {
      case ("name"):
        this.setState({ username: event.target.value })
        break;
      case ("pass"):
        this.setState({password:event.target.value})
        if (this.state.password.length<8){
         this.setState({passwordResponse:"Password too short"}) 
        }
        else if (event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
          this.setState({passwordResponse:""})
        }
        else{
          this.setState({passwordResponse:"Must contain Special/Upper/Lower character and Number.."})
        }
        break;
      case ("confPass"):
        if (event.target.value === this.state.password) {
          this.setState({ confPass: event.target.value })
        }
        break;
      case ("refLink"):
        this.setState({ referralLink: event.target.value })
        break;
    }
  }

  responseMessage() {
    return (
      <div style={{ color: "red" }}>
        <h6 >
          {this.state.response}</h6>
      </div>
    )
  }

  blankResponseMessage() {
    return (
      <div style={{ color: "red" }}>
        <h6 >
          Please Enter Required Field</h6>
      </div>
    )
  }


  render() {
    return (
      <div className="remove">
        {console.log(window.location.href)}
                {this.state.isLoading?<Loader/>:null}
        <main className="main-cover">
          <section className="rightside styling">
            <div className="tab-section">
              <div className="header-prat styleHead accesDtn">
                <ul className="nav" id="myTab" role="tablist">
                  <li className="nav-item stykl">
                    <img src={require("../../assets/images/rectangle.png")} />
                  </li>
                </ul>
                <div className="log-header">
                </div>
                <div className="right-menu bar">
                  <div className="log-header">
                    <Link className="btnheader" to="/login">Login</Link>
                    <Link className="btnheader1" to="/signup"> Sign up</Link>
                  </div>
                </div>
              </div>
              <div className="loginView">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-part full-part">
                      <div className="logo-img">
                        <img src={require("../../assets/images/rectangle.png")} />
                      </div>
                      <h5 className="user-info">
                        <b>Sign up with your email</b>
                      </h5>
                      <form action="/action_page.php">
                        <h6 className="emaladd">USERNAME<sup style={{ fontSize: "14px" }}>*</sup></h6>
                        <input type="text" id="fullName" name="fullName" placeholder="Username"
                          onChange={(event) => { this.handleFieldChange(event, "name") }} />
                          <sub style={{ fontSize: "12px",color:"grey",float:"right" }}>(Case-Sensitive)</sub>

          {/* ValidationResponse */}
                        {this.state.usernameStatus ?
                          this.responseMessage()
                          : null}
                        {this.state.usernameLen == 0 ? this.blankResponseMessage() : null}
          {/* ValidationResponse ENDS*/}


                        <h6 className="emaladd">EMAIL ADDRESS<sup style={{ fontSize: "14px" }}>*</sup></h6>
                        <input type="text" id="emailAddress" name="cv cv emailAddress" value={this.props.location.state.email} />
                        
          {/* ValidationResponse */}
                        {this.state.emailStatus ?
                          this.responseMessage()
                          : null}
          {/* ValidationResponse ENDS*/}

                        {/* <h6 className="emaladd">MOBILE NUMBER<sup style={{ fontSize: "14px" }}>*</sup></h6>
                        <input type="text" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number"
                          onChange={(event) => { this.handleFieldChange(event, "phoneNo") }} /> */}

          {/* ValidationResponse */}
                        {/* {this.state.phonenumberStatus ?
                          this.responseMessage()
                          : null}
                        {this.state.PhoneLen == 0 ? this.blankResponseMessage() : null} */}
          {/* ValidationResponse ENDS*/}


                        <h6 className="emaladd">CREATE PASSWORD<sup style={{ fontSize: "14px" }}>*</sup></h6>
                        <input type="password" id="createPassword" name="createPassword" placeholder="Create Password"
                          onChange={(event) => { this.handleFieldChange(event, "pass") }} />
                          <sub style={{ fontSize: "12px",color:"grey",float:"right" }}>(Case-Sensitive)</sub>


            {/* ValidationResponse */}                        
            {this.state.passwordResponse!=""?
            <div style={{ color: "orange" }}>
            <h6 >{this.state.passwordResponse}</h6>
            </div>
            :null  
          }
                        {this.state.passLen == 0 ? this.blankResponseMessage() : null}
          {/* ValidationResponse ENDS*/}

                        <h6 className="emaladd">CONFIRM PASSWORD<sup style={{ fontSize: "14px" }}>*</sup></h6>
                        <input type="password" id="createPassword" name="confirmPassword" placeholder="Confirm Password"
                          onChange={(event) => { this.handleFieldChange(event, "confPass") }} />

          {/* ValidationResponse */}

                        {this.state.password !== this.state.confPass ?
                          <div style={{ color: "red" }}>
                            <h6 >Password Does Not Match!</h6>
                          </div>
                          : null
                        }
          {/* ValidationResponse ENDS*/}
                        {
                          this.props.location.search==""
                          ?
                          <div>
                          <h6 className="emaladd">REFFERAL LINK</h6>
                          <input type="text" id="fullName" name="fullName" placeholder="Refferal Link"
                            onChange={(event) => { this.handleFieldChange(event, "refLink") }} />
                          </div>
                          : <div>
                          <h6 className="emaladd">REFFERAL LINK</h6>
                          <input type="text" id="fullName" name="fullName" placeholder="Refferal Link"
                            // onChange={(event) => { this.handleFieldChange(event, "refLink") }}
                            value={window.location.href}
                            />
                          </div>}
                          {/* {this.state.referallStatus ?
                          this.responseMessage()
                          : null} */}
                       {this.state.failedFeild ?
                        this.responseMessage()
                        : null}
                      {this.state.passwordEmpty ?
                        this.responseMessage()
                        : null}
                      {this.state.succesfull ?
                        this.responseMessage()
                        : null}
                      {this.state.signUpStatus ?
                        <div style={{ color: "green" }}>
                          <h6 >
                            {this.state.response}</h6>
                        </div>
                        : null
                      }
                        <label>
                          <input type="checkbox" checked={this.state.tnc ? "checked" : ""} name="remember" onClick={() => { this.tncStatus() }} />
                          <Link to="/tnc" style={{fontSize:"14px"}}> Accept Terms And Condition</Link>
                        </label>
                      </form>


          {/* ValidationResponse */}
                      {/* {this.state.failedFeild ?
                        this.responseMessage()
                        : null}
                      {this.state.passwordEmpty ?
                        this.responseMessage()
                        : null}
                      {this.state.succesfull ?
                        this.responseMessage()
                        : null}
                      {this.state.signUpStatus ?
                        <div style={{ color: "green" }}>
                          <h6 >
                            {this.state.response}</h6>
                        </div>
                        : null
                      } */}
                      {/* ValidationResponse ENDS*/}

                      <div className="uppdte mt-4">
                        <button disabled={!this.state.tnc} type="submit" style={this.state.tnc ? {} : { color: "grey" }} onClick={() => this.submitHandle()}>Submit</button>
                        <p className="alredy">ALREADY HAVE AN ACCOUNT?
                                                <b>
                            <Link to="/login" style={{ fontSize: "14px" }}> LOGIN</Link>
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bulding">
                      <img src={require("../../assets/images/aeroplane.png")} />
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
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({ signUp }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialSignUp);
