import React, { Component } from "react";
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import {ToastsContainer, ToastsStore} from 'react-toasts';



class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu:false
    }
    
    this.localStorage= (JSON.parse(localStorage.getItem("userData")))

}
  menuHandler(){
    this.setState({menu:!this.state.menu})
  }
    submitHandle=(e)=>{
      if(e=="/login"){
        localStorage.clear()
        this.props.history.push(e)
    }
    else{
        this.props.history.push(e)
    }
      }
    render() {
        return (
            <div className="remove">
                  <ToastsContainer store={ToastsStore}/>

                  <main className="main-cover">
    <section className="rightside styling" >
      <div className="tab-section">
            <div className="header-prat headerDfr">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item stykl">
                            <img src={require("../assets/images/rectangle.png")}/>
                        </li>
                    </ul>
                    <div className="moreValue">
                        <ul className="headerlogo">
                            {/* <!-- <li className="nav-item homewidth">
                                <img src={require("../assets/images/home.png")}/>

                            </li> --> */}
                      <li className="nav-item setWidth" onClick={()=>this.submitHandle("/wallet")}>
                          Wallet
                      </li>
                      <li className="nav-item setWidth" onClick={()=>this.submitHandle("/about_us")}>
                          About us
                      </li>
                      <li className="nav-item contc" onClick={()=>this.submitHandle("/contact_us")}>
                          Contact us
                      </li>
                        </ul>
                    </div>
                    <div className="right-menu bar">

                    <div style={{display:"flex"}}  onClick={()=>this.submitHandle("/viewprofile")}>
                    <figure><img src={this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>
                                    <label className="user-name">{this.localStorage.userData.username}</label>
                    </div>
                    <div className="bars-icon" onClick={()=>this.menuHandler()} >
                      <span className="showmebu ">
                          <i className="fa fa-bars"></i>
                      </span>                    
                      <div className="dropdown-box" style={{display:this.state.menu?"block":"none"}}>
                                <ul className="submenues">
                                <li onClick={()=>this.submitHandle("/home_index")} >HOME</li>
                                            <li onClick={()=>{this.submitHandle("/viewprofile")}}  >MY PROFILE</li>
                                            <li onClick={()=>{ToastsStore.error("Work in progress....")}} >SIM FORUM</li>
                                            <li onClick={()=>{ToastsStore.error("Work in progress....")}} >SIM CHAT</li>
                                            <li onClick={()=>this.submitHandle("/wallet")}  >WALLET</li>
                                            <li onClick={()=>{ToastsStore.error("Work in progress....")}} >KYC</li>
                                            <li onClick={()=>this.submitHandle("/login")}  >SIGN OUT</li>
                                    {/* <li onClick={()=>this.submitHandle("/viewprofile")}   className="ipad">
                                        <figure>
                                            <img src={require("../assets/images/download.png")}/>
                                        </figure>
                                        <label className="user-name">{this.localStorage.userData.username}</label>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

        <div className="loginView">
          <div className="row">
            <div className="col-md-6">
              <div className="left-part full-part">
                <div className="logo-img">
                  <img src={require("../assets/images/rectangle.png")}/>
                </div>
                <h5 className="user-info">
                  <b>Contact Us</b>
                </h5>
                <form action="/action_page.php">
                  <h6 className="emaladd">USERNAME</h6>
                  <input type="text" id="email" name="email" placeholder="Username"/>
                  <h6 className="emaladd">EMAIL ID</h6>
                  <div className="holderpass">
                    <input type="password" id="password" name="password" placeholder="EMAIL ID"/>
                  </div>
                  <h6 className="emaladd">MOBILE NUMBER</h6>
                  <input type="text" id="email" name="email" placeholder="MOBILE NUMBER"/>
                  <textarea className="mt-3" rows="4" cols="50" placeholder="Description"></textarea>

                        <div className="uppdte mt-4">
                            <button type="submit">Submit</button>
                           </div>
                    <div className="uppdte mt-4">
                        <button type="submit">Contact with Facebook <i className="fa fa-facebook" style={{marginLeft: "12px", fontSize: "20px"}}></i></button>
                       </div>
                      <div className="uppdte mt-4">
                        <button type="submit">Contact  with Telegram<i className="fa fa-telegram" style={{marginLeft: "18px", fontSize: "20px"}}></i></button>
  
                      </div>
                      <div className="uppdte mt-4">
                        <button type="submit">Contact with Google<i className="fa fa-google-plus" style={{marginLeft: "40px", fontSize: "20px"}}></i></button>
  
                      </div>
                  
                </form>

              </div>
            </div>
            <div className="col-md-6">
              <div className="bulding">
                <img src={require("../assets/images/aeroplane.png")}/>
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
      isLoggedIn: state.isLoggedIn,
      userData:state.userData
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Contact);