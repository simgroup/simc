import React, { Component } from "react";
import { connect } from "react-redux";
import {ToastsContainer, ToastsStore} from 'react-toasts';


class HomeIndex extends Component {
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
  submitHandle = (e) => {
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
              <img src={require("../assets/images/Simgroup web.png")} />
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
              <img src={require("../assets/images/btmimg.png")} />
            </div>
          </section>
          <section className="rightside">
            <div className="tab-section">
              <div className="header-prat">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="Submit-tab" data-toggle="tab" href="#Submit" role="tab"
                      aria-controls="Submit" aria-selected="true">Submit</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="Submited-tab" data-toggle="tab" href="#Submited" role="tab"
                      aria-controls="Submited" aria-selected="false">Submitted</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="Overview-tab" data-toggle="tab" href="#Overview" role="tab"
                      aria-controls="Overview" aria-selected="false">Overview</a>
                  </li>
                </ul>
                <div className="right-menu">

                  <div style={{ display: "flex" }} onClick={() => this.submitHandle("/viewprofile")}>
                  <figure><img src={this.localStorage.userData.image ? this.localStorage.userData.image : require("../assets/images/profile.jpeg")}style={{ minHeight:"30px",minWidth:"30px", maxHeight:"30px",maxWidth:"30px", borderRadius: "30px" }}/></figure>
                    <label className="user-name">{this.localStorage.userData.username}</label>
                  </div>
                  <div className="bars-icon"  onClick={()=>this.menuHandler()}>
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
                <ul className="lipartion">
                  <li className="">
                    <div className="tab-content">
                      {/* <!-- FirstTAb --> */}
                      <div className="tab-pane active" id="Submit" role="tabpanel" aria-labelledby="Submit-tab">
                        <div className="row">
                          <div className="col-md-8 leftform">
                            <nav className="nav">
                              <a className="nav-link active" href="#">
                                <h1>Enter</h1>
                              </a>
                              <a className="nav-link" href="#">
                                <h1>Review and Submit</h1>
                              </a>

                            </nav>
                            <div className="form-section">
                              <form>
                                <div className="form-group ideaname">
                                  <h2>Project / idea name</h2>
                                  <label><i>What is the name of your idea, project or service?</i></label>
                                  <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group description">
                                  <h2>Description</h2>
                                  <label><i>Write and explain about your idea in details</i></label>
                                  <textarea rows="4" cols="50"></textarea>
                                </div>
                                <div className="form-group upload">
                                  <h2>Attachments</h2>
                                  <label><i>Upload documents, sketches or other helpful information (Max 10 mb)</i></label>
                                  <button type="submit" className="btn themebtn">Upload</button>
                                </div>
                                <div className="form-group simmilaridea">
                                  <h2>Is your idea based on something similar</h2>
                                  <input id="radio1" name="radio" type="radio" className="radio d-none" checked="checked" /> <label
                                    for="radio1">Yes</label>
                                  <input id="radio2" name="radio" type="radio" className="radio d-none" /> <label
                                    for="radio2">No</label>
                                  <label><i>Yes: Please specify which Product or service it is similair to</i></label>
                                  <textarea rows="4" cols="50"></textarea>
                                </div>
                                <div className="form-group sellides">
                                  <h2>Sell your idea</h2>
                                  <label><i>Describe your idea with minimum of 150 words, use sell arguments and </i></label>
                                  <label><i>explain why your idea should be developed</i></label>
                                  <textarea rows="4" cols="50"></textarea>
                                </div>
                                <div className="form-group sellides">
                                  <h2>Possible hurdles which may be encountered </h2>
                                  <label><i>Describe hurdles which you  have analysed. </i></label>
                                  <textarea rows="4" cols="50"></textarea>
                                </div>
                                <label>
                                  <input type="checkbox" checked="checked" name="remember" />
                                  <span className="rem" onClick={()=>{this.submitHandle("/tnc")}}>Accept Terms And Condition</span>
                                </label>
                                <div className="chcek-btn">
                                  <input id="checkbox1" name="checkbox" type="checkbox" checked="checked" className="d-none" />
                                  <label for="checkbox1">I agree to the terms of service</label>
                                  <button type="submit" className="btn themebtn">Save</button>
                                  <button type="submit" className="btn themebtn">Cancel</button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="rightside-img">
                              <img src={require("../assets/images/user1.png")} />
                            </div>

                          </div>
                        </div>


                      </div>
                      {/* <!-- SecondTAb --> */}
                      <div className="tab-pane" id="Submited" role="tabpanel" aria-labelledby="Submited-tab">
                        <div className="row">
                          <div className="col-md-8 leftform">
                            <nav className="nav">
                              <a className="nav-link active" href="#" style={{ width: "25%" }}>Current</a>
                              <a className="nav-link" href="#">Archive</a>
                            </nav>
                            <div className="cardproperty">
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                              <div className="approved">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                          </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>
                                <div className="votes"><a href="index-2.html"><button type="submit" className="voteSection"
                                  style={{ fontSize: "14px" }}>Vote</button></a></div>
                              </div>
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                                <div className="approved">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                            </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>
                                <div className="votes"><a href="index-2.html"><button type="submit" className="voteSection"
                                  style={{ fontSize: "14px" }}>Vote</button></a></div>
                              </div>
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                                  <div className="approved">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                              </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>
                                <div className="votes"><a href="index-2.html"><button type="submit" className="voteSection"
                                  style={{fontSize: "14px"}}>Vote</button></a></div>
                              </div>

                            </div>
                            <div className="cardpropertys">
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                                  <div className="approveds">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                              </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>

                              </div>
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                                    <div className="approvede">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                                </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>
                              </div>
                              <div className="card whitebox cwhitebox" style={{ width: "100%" }}>
                                <div className="imgpath">
                                  <img src={require("../assets/images/nopath.png")} />
                                </div>
                                <div className="card-body">
                                  <div className="donation">
                                    <label>Donation App</label>
                                  </div>
                                  <div className="username">
                                    <div className="categoryDetail">
                                      <p>Username:</p>
                                      <p>Category:</p>
                                    </div>
                                    <div className="categoryDetail">
                                      <p>Approved
                                      <div className="approved">
                                        </div>
                                      </p>
                                      <p>Votes:</p>
                                    </div>
                                  </div>
                                  <div className="content">
                                    <p>This idea is to create an application that will allow users to immediately donate to a
                                      disaster or charity.
                                  </p>
                                  </div>
                                  <button type="submit" className="click">Click here for more info</button>
                                </div>


                              </div>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="rightsvd table-responsive">
                              <table className="table ctable ">
                                <thead>
                                  <tr className="tbl">
                                    <th scope="col">Pos</th>
                                    <th scope="col">Idea</th>
                                    <th scope="col">Vote</th>
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
                      {/* <!-- LastTab --> */}
                      <div className="tab-pane" id="Overview" role="tabpanel" aria-labelledby="Overview-tab">
                        <div className="row">
                          <div className="col-md-8 leftform">
                            <div className="first-tab">
                              <h1>Overview Tab</h1>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="right-image table-responsive">
                              <table className="table ctable">
                                <thead>
                                  <tr className="tbl">
                                    <th scope="col">Pos</th>
                                    <th scope="col">Idea</th>
                                    <th scope="col">Vote</th>
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
                  </li>

                </ul>
              </div>
            </div>
          </section>
          <section className="leftside mobile">
            <div className="logoimg">
              <img src={require("../assets/images/Simgroup web.png")} />
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
              <img src={require("../assets/images/btmimg.png")} />
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

// export default HomeIndex;
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeIndex);