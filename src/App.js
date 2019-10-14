import React,{Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Redirect} from "react-router-dom"



import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";



import * as actionCreator  from "./store/actions/actions"
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword"
import ChangePassword from "./screens/ChangePassword"
import Profile from "./screens/Profile"
import SignUp from "./screens/SignUp"
import EditProfile from "./screens/EditProfile"
import Refferal from "./screens/Refferal"
import Wallet from "./screens/Wallet"
import HomeIndex from "./screens/HomeIndex"
import About from "./screens/About"
import Contact from "./screens/Contact"
import TnC from './screens/TnC';
import OTP from './screens/OTP';
import MobOTP from './screens/MobVerify';
import NewPassword from "./screens/NewPassword";
import social from "./screens/SocialSignup/SocialSignup"

const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    localStorage.getItem("userData") != null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)
const PrivateRouteLogout = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    localStorage.getItem("tempUser") != null || localStorage.getItem("userData") != null 
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)
const PrivateRouteOtp = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    localStorage.getItem("otpVerified") != null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class  App extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
 render(){
    return(
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/resetPassword" exact component={ResetPassword}/>
        <Route path="/tnc" exact component={TnC}/>
        <Route path="/social" exact component={social}/>



        {/* Private Route Logout */}
        <PrivateRouteLogout path="/otp" exact component={OTP}/> 
        {/* Private route NewPassword */}
        <PrivateRouteOtp path="/newPassword" exact component={NewPassword}/> 

        {/* PrivateRoutes */}        
        <PrivateRoute path="/about_us" exact component={About}/>
        <PrivateRoute path="/contact_us" exact component={Contact}/>
        <PrivateRoute path="/home_index" exact component={HomeIndex}/>
        <PrivateRoute path="/refferal" exact component={Refferal}/>
        <PrivateRoute path="/editprofile" exact component={EditProfile}/>
        <PrivateRoute path="/viewprofile" exact component={Profile}/>
        <PrivateRoute path="/wallet" exact component={Wallet}/>
        <PrivateRoute path="/changePassword" exact component={ChangePassword}/> 
        <PrivateRoute path="/mobOtp" exact component={MobOTP}/>

      </Router>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    // data:state.data
    isLoggedIn:state.isLoggeIn
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    // doSomething:()=> dispatch(actionCreator.doSomething(1))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
