import React,{Component} from 'react';
import {connect} from "react-redux";
import apiServices from "../apiServices/services"
import { bindActionCreators } from 'redux'
import {userLoginData} from '../store/action/ActionIndex'

import Loader from "../components/loader/Loader"

class  Login extends Component{
  constructor(props){
    super(props)
    this.state={
      email:null,
      emailStatus:false,
      password:null,
      passwordStatus:false,
      isLoading:false,
      responseDisplay:null
    }
  }

  fieldHandler(event,type){
    switch(event.target.value,type){
      case("email"):
        if (event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
          this.setState({ email: event.target.value.toLowerCase() })
        }
      break;
      case("password"):
      this.setState({password:event.target.value})
      break;
      default:
      break
    }

  }
  submitHandler(){
    var reqData={
      "email":this.state.email,
	    "password":this.state.password
    }
    this.setState({isLoading:true,emailStatus:false,passwordStatus:false})
     apiServices(reqData,"/adminLogin","POST")
    .then(response=>{
        if(response.data.responseCode!=200){
          switch(response.data.responseMessage){
            case("Invalid email!"):
              this.setState({...this.state,responseDisplay:response.data.responseMessage,emailStatus:true,passwordStatus:false,isLoading:false})
            break
            case("Wrong Password!"):
              this.setState({...this.state,responseDisplay:response.data.responseMessage,emailStatus:false,passwordStatus:true,isLoading:false})
            break
            case("Please fill the required fields"):
            this.setState({...this.state,responseDisplay:response.data.responseMessage,emailStatus:true,passwordStatus:true,isLoading:false})

          }
        }
       else{
            console.log("response",response)
            localStorage.setItem("authToken",response.data.get_auth_token)
            this.props.action.userLoginData(response.data.responseMessage)
            this.setState({isLoading:false}, ()=>this.props.history.push("/temp"))
       }
      
    })
    .catch(err=>{
      console.log(err)
      this.setState({isLoading:false})

    })
  }
  responseMessageDisplay(){
    return(
      <div style={{color:"red "}}>
        {this.state.responseDisplay}
      </div>
    )
  }

  render(){
    return(
      <div>
      {this.state.isLoading?<Loader/>:null}
        <div className="login-wrapper">
         <div className="container-common">
            <div className="row justify-content-center">
               <div className="col-md-6 ">
                  <div className="login_box_outer" >
                     <div className="login-logo1 text-center mb30">
                        <img src={require("../assets/images/Simgroup web.png")} alt="logo" />
                     </div>
                     <div className="login-box max-WT-520">
                        <div className="login-right-block">
                           <div className="login-heading">
                              <h4>Login</h4>
                           </div>
                           <div className="login-box-body">
                                <div className="form-group">
                                    <label className="common-label blue">Enter email</label>
                                    <input type="email" className="form-control"  placeholder="Enter email" onChange={(event)=>this.fieldHandler(event,"email")}/>
                                </div>
                                {this.state.emailStatus?this.responseMessageDisplay():null}
                                <div className="form-group">
                                    <label className="common-label blue">Password</label>
                                    <input type="password" className="form-control " placeholder="Password" onChange={(event)=>this.fieldHandler(event,"password")} />
                                </div>
                                {this.state.passwordStatus?this.responseMessageDisplay():null}
                                <div className="d-flex">
                                    <label className="checkbox-design">
                                        <input type="checkbox"/><span></span>Remember me
                                    </label>
                                    <a className="forget-pass ml-auto">Forgot Password?</a>
                                </div>
                                <div className="text-center mt20">
                                  <button className="btn btn-login btn-large" onClick={()=>this.submitHandler()}>LOGIN</button>
                                </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      </div>
    )     
  }
}

const mapStateToProps=(state)=>{
  return {
    // data:state.data
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    action: bindActionCreators({ userLoginData }, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
