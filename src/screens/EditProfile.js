import React, { Component } from "react";
import { connect } from "react-redux";
import apiRequest from "../apiServices/services"
import Loader from "../assets/loader/Loader"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {ToastsContainer, ToastsStore} from 'react-toasts';




class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false,
            profileImage: "",
            mobStatus: "false",
            responseMessage: "",
            base64: "",
            phone: "",
            updateMobNo: "",
            updatedImageUrl: "",
            isloading: false
        }

        this.localStorage = (JSON.parse(localStorage.getItem("userData")))

    }
    menuHandler() {
        this.setState({ menu: !this.state.menu })
    }
    
    submitHandle = (e) => {
        if (e == "/login") {
            localStorage.clear()
            this.props.history.push(e)
        }
        else {
            this.props.history.push(e)
        }
    }

    changeHandler = (event) => {
        if (event.target.value.length > 10 && event.target.value.match(/^\d{12}$/)) {
          this.setState({ Mob_Number:"+"+ event.target.value })
        }

    }

    editImage(e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                file: file,
                base64: reader.result
            });
        };
        
    }
    editProfileApi() {
        var reqData = {
            "username": this.localStorage.userData.username,
            "Mob_Number": this.state.phone !=undefined ? this.state.phone : "",
            "base64": this.state.base64 != "" ? this.state.base64 : ""
        }
        console.log("xasdsdfsdfsdf",reqData.MOB_Data)
        this.setState({isLoading:true})
        apiRequest(reqData, "/editProfile", "POST", this.localStorage.authToken)
            .then(data => {
                if (data.data.responseCode == "200") {

                    this.setState({isLoading:false})
                    switch (data.data.responseMessage) {
                        case ("Record Updated Successfully"):
                            var userData = { ...JSON.parse(localStorage.getItem("userData")), "userData": data.data.responseData.userData }
                            localStorage.setItem('userData', JSON.stringify(userData))
                            ToastsStore.success("Record Updated Successfully")
                            // console.log(this.localStorage.userData.verifyMob)
                            if(this.localStorage.userData.Mob_Number!=this.state.phone&&this.state.phone!=""){
                                this.props.history.push("/mobOtp")
                            }
                            break;
                        case ("Mobile Number Already Exist!"):
                                ToastsStore.warning("Mobile Number Already Exist!")
                                this.setState({isLoading:false,responseMessage:"Mobile Number Already Exist!"})

                            break;
                        case ("Nothing to update!"):
                                ToastsStore.warning("Nothing to update!")
                            break;
                    }

                }
                else {
                }   

            }
            )
            .catch(err => console.log(err)

            )

    }



    render() {
        return (
            <div className="remove">
                {this.state.isLoading ? <Loader /> : null}
                {console.log(this.state)}
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
                                        <li className="nav-item setWidth" onClick={() => this.submitHandle("/wallet")} style={{ width: "16%" }}>
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

                                <figure><img src={this.state.base64!=""?this.state.base64:this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>

                                    <label className="user-name" onClick={() => this.submitHandle("/viewprofile")} >{this.localStorage.userData.username}</label>
                                    <div className="bars-icon" onClick={() => this.menuHandler()}>
                                        <span className="showmebu ">
                                            <i className="fa fa-bars"></i>
                                        </span>
                                        <div className="dropdown-box" style={{ display: this.state.menu ? "block" : "none" }}>
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
                            <div className="content-view">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="left-part  widthSet full-part">
                                            {/* <div className="logo-img">
                                                <img src={require("../assets/images/rectangle.png")} />
                                            </div> */}
                                            <h5 className="user-info">
                                                <b>EDIT PROFILE</b>
                                            </h5>
                                            {/* <form> */}
                                            <div className=" row" style={{ minHeight: '110px' }}>
                                                <div className="userProfile" style={{ position: 'relative', height: '100%' }}>
                                                    <img src={this.state.base64!=""?this.state.base64:this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")} style={{ minHeight:"100px",minWidth:"100px", maxHeight:"100px",maxWidth:"100px", borderRadius: "100px" }} />
                                                    <i class="fa fa-pencil" onChange={(e) => this.editImage(e)} style={{ position: "absolute" }}>
                                                        <input type="file"
                                                            style={{ width: "20px", height: "20px", position: "absolute", left: "2px ", opacity: "0" }}
                                                        />
                                                    </i>

                                                </div>

                                            </div>

                                            <div className=" row">
                                                <label for="staticEmail"
                                                    className="col-sm-6 col-form-label spaceWet">USERNAME</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.username} disabled={true} />
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail" className="col-sm-6 col-form-label spaceWet">EMAIL
                                            ADDRESS</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.email} disabled={true} />
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail" className="col-sm-6 col-form-label spaceWet">MOBILE
                                            NUMBER</label>
                                                <div className="col-sm-6">
                                                <PhoneInput
                                                    placeholder="Enter phone number"
                                                    value={ this.state.phone }
                                                    onChange={ phone => this.setState({ phone }) } 
                                                    country="IN"
                                                    placeholder={this.localStorage.userData.verifyMob?this.localStorage.userData.Mob_Number:"-"}
                                                />
                                                    {/* <input type="text" className="form-control" onChange={(e) => this.changeHandler(e)} placeholder={this.localStorage.userData.verifyMob?this.localStorage.userData.Mob_Number:"-"} /> */}
                                                </div>
                                            </div>
                                            <div>
                                                {this.state.responseMessage!=""
                                                ?
                                                <div style={{ color: "red" }}>
                                                <h6 >
                                                  {this.state.responseMessage}</h6>
                                                </div>
                                                : null}
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail" className="col-sm-6 col-form-label spaceWet">TRON
                                            WALLET</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.wallet?this.localStorage.userData.wallet:"-"} disabled={true} />
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail" className="col-sm-6 col-form-label spaceWet">REFFERAL
                                            LINK</label>
                                                <div className="col-sm-6">
                                                    <label for="staticEmail" className="col-sm-4 col-form-label referSpcl" style={{ paddingRight: "6px" }}>
                                                        {this.localStorage.userData.referralLink}
                                                        <CopyToClipboard text={this.localStorage.userData.referralLink}
                                                onCopy={() => console.log("copying")}>
                                               <i  onClick={() => ToastsStore.success("Copied!")}className="fa fa-copy">
                                                <ToastsContainer store={ToastsStore}/>
                                                </i>
                                                </CopyToClipboard>
                                                        {/* <i className="fa fa-share"></i> */}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail"
                                                    className="col-sm-6 col-form-label spaceWet">FACEBOOK</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.Facebook?this.localStorage.userData.Facebook:"-"} />
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail"
                                                    className="col-sm-6 col-form-label spaceWet">TWITTER</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.twitter?this.localStorage.userData.twitter:"-"} />
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <label for="staticEmail"
                                                    className="col-sm-6 col-form-label spaceWet">GMAIL</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" placeholder={this.localStorage.userData.Gmail?this.localStorage.userData.gmail:"-"} />
                                                </div>
                                            </div>
                                            <div className="uppdte mt-4">
                                                <button type="submit" onClick={() => this.editProfileApi()}>Save</button>
                                            </div>
                                            {/* </form> */}
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="right-image table-responsive full-part" style={{
                                            height: "721px",
                                            maxWidth: "500px"
                                        }}>
                                            <div className="noof">
                                                <p>No. of people Reffered {this.localStorage.referredList.length}</p>
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
                                                    {this.localStorage.referredList.map((refferedItem) => {
                                                        return (<tr>
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

// export default EditProfile;
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);