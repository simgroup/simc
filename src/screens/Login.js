import React, { Component } from "react";
import { Link } from "react-router-dom"
import {connect} from "react-redux";
import {logIn}  from "../store/actions/actions"
import {bindActionCreators} from 'redux'
import apiRequest from "../apiServices/services"
import Loader from "../assets/loader/Loader"
import {ToastsContainer, ToastsStore} from 'react-toasts';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: "",
          password: "",
          userStatus:false,
          passwordStatus:false,
          rememberStatus:false,
          isLoading:false
        }
    }

    submitHandle = () => {
        this.setState({userStatus:false,passwordStatus:false,
            response:"",isLoading:true})
        this.api()
    }
    rememberStatus(){
        this.setState({rememberStatus:!this.state.rememberStatus})
    }

    responseMessage(){
        return(
          <div style={{ color: "red" }}>
          <h6 >
            {this.state.response}
            </h6>
        </div>
        )
      }


    api(){
        var reqData = {
            "username": this.state.username,
            "password": this.state.password,
        }
        apiRequest(reqData,"/logIn","POST")
        .then(data=>{
        //   console.log(data.data)
          if (data.data.responseCode!="200"){
            switch(data.data.responseMessage){
                case("Password Does Not Match!"):
                this.setState({userStatus:false,passwordStatus:true,response:data.data.responseMessage,isLoading:false})
                break;
                case("Username Does Not Match!"):
                this.setState({userStatus:true,passwordStatus:false,response:data.data.responseMessage,isLoading:false})
                break;
                case("Internal Server Error!"):
                ToastsStore.error("Make sure you entered credentials!")

                default:
                    this.setState({isLoading:false})
            }
          }
          else if(data.data.responseCode=="200"){
              this.setState({isLoading:false})
            this.props.action.logIn(data)

            localStorage.setItem('userData', JSON.stringify(data.data.responseData));
            // console.log(data,localStorage.getItem("userData"))
            this.props.isLoggeIn?
            this.props.history.push("/refferal")
            :this.props.history.push("/login")    
          }
          else{
            console.log("Invalid CaseA")
            this.setState({isLoading:false})

          }
            
        }
        )
          
        }




    handleFieldChange(event, type) {
        switch (type) {
          case ("username"):
            this.setState({ username: event.target.value })
            break;
          case ("password"):
            if(event.target.value.length>8){  
              this.setState({ password: event.target.value })
            }
            break;
        }
        // console.log("event clicked", event.target.value, type)
        // console.log(this.state)
      }

    render() {
        return (
            <div className="remove" >
                {this.state.isLoading?<Loader/>:null}

                <ToastsContainer store={ToastsStore}/>
                <main className="main-cover">
                    <section className="rightside styling" >
                        <div className="tab-section">
                            <div className="header-prat styleHead accesDtn">
                                <ul className="nav" id="myTab" role="tablist">
                                    <li className="nav-item stykl">
                                        <img src={require("../assets/images/rectangle.png")}/>
                                    </li>
                                </ul>
                                <div className="log-header">

                                </div>
                                <div className="right-menu bar">

                                    <div className="log-header">
                                        <Link className="btnheader" to="/login">Login</Link>
                                        <Link className=" btnheader1 " to="/signup"> Sign up</Link>
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
                                            <h5 className="user-info">
                                                <b>LOGIN</b>
                                            </h5>
                                                <h6 className="emaladd">USERNAME</h6>
                                                <input type="text" id="email" name="email" placeholder="Username" 
                                                onChange={(event) => { this.handleFieldChange(event, "username") }} />
                                                {this.state.userStatus?
                                                    this.responseMessage()
                                                    :null}
                                                <h6 className="emaladd">PASSWORD</h6>
                                                <div className="holderpass">
                                                    <input type="password" id="password" name="password" placeholder="Password" 
                                                    onChange={(event) => { this.handleFieldChange(event, "password") }} />
                                                    {/* <span className="eye">
                                                        <i className="fa fa-eye"></i>
                                                    </span> */}
                                                </div>
                                                {this.state.passwordStatus?
                                                    this.responseMessage()
                                                    :null}
                                                <label>
                                                    <input type="checkbox" checked={this.state.rememberStatus?"checked":""} onClick={() => this.rememberStatus()} name="remember" />
                                                    <span className="rem">Remember me</span>
                                                </label>
                                                <span className="psw">
                                                    <u><Link to="/resetPassword" className="passwordSet">Forgot password? </Link></u>
                                                </span>
                                                <div className="uppdte mt-4">
                                                    <button type="submit" onClick={() => this.submitHandle()}>LOGIN</button>
                                                    <div className="uppdte mt-4">
                                                        <button type="submit" onClick={()=>{ToastsStore.error("Work in progress....")}}>Login with Facebook <i className="fa fa-facebook" style={{ marginLeft: "12px", fontSize: "20px" }}></i></button>
                                                    </div>
                                                    <div className="uppdte mt-4">
                                                        <button type="submit" onClick={()=>{ToastsStore.error("Work in progress....")}}>Login with Twitter<i className="fa fa-twitter" style={{ marginLeft: "40px", fontSize: "20px" }}></i></button>

                                                    </div>
                                                    <div className="uppdte mt-4">
                                                        <button type="submit" onClick={()=>{ToastsStore.error("Work in progress....")}}>Login with Google <i className="fa fa-google-plus" style={{ marginLeft: "12px", fontSize: "20px" }}></i></button>

                                                    </div>
                                                    <p className="alredy">DON'T HAVE AN ACCOUNT?
                                                        <b>
                                                            <Link to="/signup" style={{ fontSize: "14px" }}> SIGN UP</Link>
                                                        </b>
                                                    </p>
                                                </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bulding">
                                            <img src={require("./../assets/images/aeroplane.png")} />
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
      isLoggeIn:state.isLoggeIn
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
      action:bindActionCreators({logIn},dispatch)
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
  