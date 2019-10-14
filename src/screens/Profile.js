import React, { Component } from "react";
import { Link } from "react-router-dom"

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import apiRequest from "../apiServices/services"
import { throwStatement } from "@babel/types";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ToastsContainer, ToastsStore} from 'react-toasts';



class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu:false,
      referredList:[]
    }
    
    this.localStorage= (JSON.parse(localStorage.getItem("userData")))

}
  menuHandler(){
    this.setState({menu:!this.state.menu})
  }
  submitHandle = (e) => {
    if(e=="/login"){
      localStorage.clear()
      this.props.history.push(e)
  }
  else{
      this.props.history.push(e)
  }
  }
  componentDidMount(){
    var reqData = {
      "username": this.localStorage.userData.username,
    }
    apiRequest(reqData,"/getInfo", "POST",this.localStorage.authToken)
    .then(resp=>{
      console.log(resp.data.responseData)
      var userData = { ...JSON.parse(localStorage.getItem("userData")), "userData": resp.data.responseData.userData,"referredList":resp.data.responseData.referredList }
      localStorage.setItem('userData', JSON.stringify(userData))
      this.setState({referredList:resp.data.responseData.referredList})
    }).catch(err=>console.log(err))

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
                    <img src={require("../assets/images/rectangle.png")} />
                  </li>
                </ul>
                <div className="moreValue">
                  <ul className="headerlogo">
                    <li className="nav-item setWidth" onClick={() => this.submitHandle("/wallet")} >
                      Wallet
                      </li>
                    <li className="nav-item setWidth" onClick={() => this.submitHandle("/about_us")}>
                      About us
                      </li>
                    <li className="nav-item contc" onClick={() => this.submitHandle("/contact_us")}>
                      Contact us
                      </li>
                  </ul>
                </div>
                <div className="right-menu bar">

                  <div style={{ display: "flex" }} onClick={() => this.submitHandle("/viewprofile")}>
                  <figure><img src={this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>
                    <label className="user-name">{this.localStorage.userData.username}</label>
                  </div>
                  <div className="bars-icon" onClick={()=>this.menuHandler()}>
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
                                    </li> */
                                    }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-view">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-part  widthSet full-part">
                      {/* <div className="logo-img">
                        <img src={require("../assets/images/rectangle.png")} />

                      </div> */}
                      <h5 className="user-info">
                          <b>PROFILE</b>
                      </h5>
                      <div className="userProfile">
                      <img style={{}} src={this.localStorage.userData.image?this.localStorage.userData.image:require("../assets/images/profile.jpeg")} style={{ minHeight:"100px",minWidth:"100px", maxHeight:"100px",maxWidth:"100px",  borderRadius: "100px"}}/>
                        {/* <img  src={require("../assets/images/profile.jpeg")}  /> */}
                      </div>
                      <form className="formSt">
                        <div className="form-group row">
                          <label for="staticEmail" className="col-sm-4 col-form-label creat">Username</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.username}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Email Address</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.email}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Mobile Number</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.verifyMob?this.localStorage.userData.Mob_Number:"-"}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Tron Wallet</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.Facebook?this.localStorage.userData.Facebook:"-"}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Refferal Link</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali simgrp">{this.localStorage.userData.referralLink} 
                            <div style={{display:"flex",flexDirection:"row"}}>
                            <CopyToClipboard text={this.localStorage.userData.referralLink}
                                                onCopy={() => console.log("copying")}>
                                                <i  onClick={() => ToastsStore.success("Copied!")}className="fa fa-copy">
                                                </i>
                            </CopyToClipboard>
                            {/* <i className="fa fa-share"></i> */}
                            </div>
                            </label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Facebook</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.Facebook?this.localStorage.userData.Facebook:"-"}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Twitter</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.twitter?this.localStorage.userData.twitter:"-"}</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputPassword" className="col-sm-4 col-form-label creat">Gmail</label>
                          <div className="col-sm-8">
                            <label for="staticEmail" className="col-sm-8 col-form-label sunali">{this.localStorage.userData.gmail?this.localStorage.userData.gmail:"-"}</label>
                          </div>
                        </div>
                      </form>
                      <div className="uppdte mt-4">
                        <Link to="/editprofile"><button type="submit">Edit Profile</button></Link>
                      </div>
                      <div className="uppdte mt-4">
                        <button onClick={() => this.submitHandle("/changePassword")} type="submit">Change Password</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">

                    <div className="right-image table-responsive full-part" style={{ height: "808px", maxWidth: "500px" }}>
                      <div className="noof">
                        <p>No. of people Reffered  {this.localStorage.referredList.length}</p>
                      </div>
                      <table className="table ctable ">
                        <thead>
                          <tr className="tbl">
                            <th scope="col">Username</th>
                            <th scope="col">Email-Id</th>
                            <th scope="col">Coin Earned</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.referredList.map((refferedItem)=>{
                             return(<tr>
                              <td>{refferedItem.Username}</td>
                              <td>{refferedItem.EmailId}</td>
                              <td>250<img className="coinset" src={require("../assets/images/coin.png")} /></td>
                          </tr>)
                          })
                          }
                        </tbody>
                      </table>
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
    userData:state.userData

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


