import React, { Component } from "react";
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import {ToastsContainer, ToastsStore} from 'react-toasts';


class About extends Component {
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
    <section className="rightside styling">
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
                          <img src="images/home.png">

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
        <div className="content-view spacingRght">
            <div className="aboutTxtt">
                <h5>About Us</h5>
            </div>
            <div className="loremDetail">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                 type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum<br/>
            </p>
        </div>
    </div>
    </div>
    </section>
 </main>
    </div>
        )}
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
      
      export default connect(mapStateToProps,mapDispatchToProps)(About);
    