import React,{Component} from 'react';
import {connect} from "react-redux";
import apiServices from "../apiServices/services"


class  Temp extends Component{
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:null
    }
  }

  render(){
    return(
      <div>
         {
            console.log(this.props)
         }
          <div className="login-wrapper">
         <div className="container-common">
            <div className="row justify-content-center">
               <div className="col-md-6 ">
                  <form className="login_box_outer" action="dashboard.html">
                     <div className="login-logo1 text-center mb30">
                        <img src={require("../assets/images/Simgroup web.png")} alt="logo" />
                     </div>
                     <div className="login-box max-WT-520">
                        <div className="login-right-block">
                           <div className="login-heading">
                              <h4>Login</h4>
                           </div>

                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>

      </div>
    )     
  }
}
const mapStateToProps=(state)=>{
   console.log("git gaya",state)
   return {
      data:state.reducer.userData
   }
 }
 
 const mapDispatchToProps=(dispatch)=>{
   return{
   //   action: bindActionCreators({ userLoginData }, dispatch)
   }
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(Temp);
 