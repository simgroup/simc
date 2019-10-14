import React, { Component } from "react";
import { connect } from "react-redux";
import {ToastsContainer, ToastsStore} from 'react-toasts';


class Wallet extends Component {
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
    <section className="leftside">
      <div className="logoimg">
        <img src={require("../assets/images/Simgroup web.png")}/>
      </div>
      <div className="left-content">
        <h2>SIMvote</h2>
        <p>This is the heartbeat of our democracy. This is where you register your Ideas and vote for existing ideas
          from other community members. Your vote is your voice. It is the way you can have a say on the major decisions
          that we as community will face on the delivery of our products. Our team will work with our community in the
          development of our products and to do this we will use this sub service. The voting process will open up
          discussion and promote an open democratic environment were we can decide what is the best way forward for all
          of us. Your vote will be discreet and only known by yourself but the polling results will be seen publicly as
          the vote is in progress so all can see the direction our community is choosing.</p>
      </div>
      <div className="bottom-img">
        <img src={require("../assets/images/btmimg.png")}/>
      </div>
    </section>
    <section className="rightside rightsdeBack">
      <div className="tab-section">
        <div className="header-prat">
          <ul className="nav">
            <li className="nav-item walt">
             Wallet
            </li>
          </ul>
          <div className="right-menu">
          <div style={{display:"flex"}}  onClick={()=>this.submitHandle("/viewprofile")}>
          <figure><img src={this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>
                                    <label className="user-name">{this.localStorage.userData.username}</label>
                                    </div>
            <div className="bars-icon" onClick={()=>this.menuHandler()}>
              <span className="showmebu"><i className="fa fa-bars"></i></span>
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
        <div className="content-view">
          <div className="row">
            <div className="col-md-6 wsded">
                <h5 className="curentVote">Wallet</h5>
            </div>
            <div className="col-md-6">
                <h5 className="curentVote">Current Vote</h5>
            </div>
          </div>
            <div className="row centerRow">
             
                    <div className="col-md-6">
                            <form className="formsset">
                                    <div className="form-group row">
                                      <label for="staticEmail" className="col-sm-4 col-form-label creat">Tron Address</label>
                                      <div className="col-sm-8">
                                        <label for="staticEmail" className="col-sm-8 col-form-label sunali">0x8dd8f3d4bb690</label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label for="inputPassword" className="col-sm-4 col-form-label creat">Total Amount</label>
                                      <div className="col-sm-8">
                                        <label for="staticEmail" className="col-sm-8 col-form-label sunali">456374</label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label for="inputPassword" className="col-sm-4 col-form-label creat">Total Freeze Amount</label>
                                      <div className="col-sm-8">
                                        <label for="staticEmail" className="col-sm-8 col-form-label sunali">347668889</label>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label for="inputPassword" className="col-sm-4 col-form-label creat">Remaining Balance</label>
                                      <div className="col-sm-8">
                                        <label for="staticEmail" className="col-sm-8 col-form-label sunali">45565676</label>
                                      </div>
                                    </div>
                                  </form>
                    </div>
                    <div className="col-md-6">

                            <div className="stelpp table-responsive">
                            <table className="table ctable">
                                    <thead>
                                      <tr className="tbl">
                                        <th scope="col">Post</th>
                                        <th scope="col">Idea</th>
                                        <th scope="col">Token Frozen</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="tbl">
                                        <td>1</td>
                                        <td>Lorem Ipsum</td>
                                        <td>973</td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Lorem Ipsum</td>
                                        <td>433</td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Lorem Ipsum</td>
                                        <td>673</td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>Lorem Ipsum</td>
                                        <td>423</td>
                                      </tr>
                                      <tr>
                                        <td>5</td>
                                        <td>Lorem Ipsum</td>
                                        <td>142</td>
                                      </tr>
                                      <tr>
                                        <td>6</td>
                                        <td>Lorem Ipsum</td>
                                        <td>973</td>
                                      </tr>
                                      <tr>
                                        <td>7</td>
                                        <td>Lorem Ipsum</td>
                                        <td>433</td>
                                      </tr>
                                      <tr>
                                        <td>8</td>
                                        <td>Lorem Ipsum</td>
                                        <td>603</td>
                                      </tr>
                                      <tr>
                                        <td>9</td>
                                        <td>Lorem Ipsum</td>
                                        <td>423</td>
                                      </tr>
                                      <tr>
                                        <td>10</td>
                                        <td>Lorem Ipsum</td>
                                        <td>132</td>
                                      </tr>
                                    </tbody>
                                  </table>
                        </div>
                    </div>
            </div>
           
        </div>
      </div>
    </section>
    <section className="leftside mobile">
      <div className="logoimg">
        <img src={require("../assets/images/Simgroup web.png")}/>
      </div>
      <div className="left-content">
        <h2>SIMvote</h2>
        <p>This is the heartbeat of our democracy. This is where you register your Ideas and vote for existing ideas
          from other community members. Your vote is your voice. It is the way you can have a say on the major decisions
          that we as community will face on the delivery of our products. Our team will work with our community in the
          development of our products and to do this we will use this sub service. The voting process will open up
          discussion and promote an open democratic environment were we can decide what is the best way forward for all
          of us. Your vote will be discreet and only known by yourself but the polling results will be seen publicly as
          the vote is in progress so all can see the direction our community is choosing.</p>
      </div>
      <div className="bottom-img">
        <img src={require("../assets/images/btmimg.png")}/>
      </div>
    </section>
    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header root">
            <h5><b>SIGNOUT</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body logoutModal">
            <b> Are you sure you want to Logout?</b>
          </div>
          <div className="modal-footer yesNo">
            <button type="button" className="btn" data-dismiss="modal">Yes</button>
            <button type="button" className="btn">No</button>
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Wallet);