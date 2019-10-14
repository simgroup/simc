import React, { Component } from "react";

import { connect } from "react-redux";
import { logIn } from "../store/actions/actions"
import { bindActionCreators } from 'redux'
import apiRequest from "../apiServices/services"
import {ToastsContainer, ToastsStore} from 'react-toasts';

import {CopyToClipboard} from 'react-copy-to-clipboard';


class Refferal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: "",
            menu:false

        }
        this.localStorage= JSON.parse(localStorage.getItem("userData"))
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
    componentDidMount() {
        this.setState({ userData: JSON.stringify(localStorage.getItem("userData")) })
    }
    render() {
        return (
            <div className="remove">
                {/* {console.log(this.localStorage.usera)} */}
                <main className="main-cover">
                    <section className="rightside styling">
                        <div className="tab-section">
                            <div className="header-prat simBackground" style={{ paddingRight: "80px" }}>
                                <ul className="nav" id="myTab" role="tablist">
                                    <li className="nav-item stykl">
                                        <img src={require("../assets/images/rectangle.png")} />
                                    </li>
                                </ul>
                                <div className="right-menu">
                                    <div style={{ display: "flex" }} onClick={() => this.submitHandle("/viewprofile")}>
                                        <figure><img src={this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>
                                        <label className="user-name">{this.localStorage.userData.username}</label>
                                    </div>
                                    <div className="bars-icon" onClick={()=>this.menuHandler()}>
                                        <span className="showmebu" ><i className="fa fa-bars" style={{ color: " #75F8FD" }}></i></span>
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
                                    <div className="col-md-6" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="left-part">
                                            <div className="furkan">
                                                <h4>Welcome {this.localStorage.userData.username}</h4>
                                            </div>
                                            <div className="link">
                                                <h5>Referral Link</h5>

                                                <p>{this.localStorage.userData.referralLink}</p>
                                                <CopyToClipboard text={this.localStorage.userData.referralLink}
                                                onCopy={() => console.log("copying")}>
                                                <i  onClick={() => ToastsStore.success("Copied!")}className="fa fa-copy">
                                                <ToastsContainer store={ToastsStore}/>
                                                </i>
                                                </CopyToClipboard>
                                                {/* <i onClick={async() => {  await navigator.clipboard.writeText(this.localStorage.userData.referralLink).then(function() {
                                                                                                            console.log('Async: Copying to clipboard was successful!');
                                                                                                            }, function(err) {
                                                                                                            console.error('Async: Could not copy text: ', err);
                                                                                                            })
                                                 }}
                                                    className="fa fa-copy"></i> */}
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
        isLoggedIn: state.isLoggedIn,
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Refferal);
