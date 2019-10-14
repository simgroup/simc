import React, { Component } from "react";

    class Header extends Component {

        render() {
            return (
                <div>
                    <main class="main-cover">
                        <section class="rightside styling">
                        <div class="tab-section">
                            <div class="header-prat styleHead accesDtn">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item stykl">
                                <img src={require("images/rectangle.png")}/>
                                </li>
                            </ul>
                            <div class="log-header">
                            
                            </div>
                            <div class="right-menu bar">

                                <div class="log-header">
                                    <a class="btnheader " href="#">Login</a>
                                    <a class=" btnheader btnheader1" href="#">Sign up</a>
                                </div>
                            </div>
                            </div>
                            <div class="loginView">
                                <div class="row">
                        <div class="col-md-6">
                            <div class="left-part full-part">
                                <div class="logo-img">
                                    <img src={require("images/rectangle.png")}/>    
                                </div>
                                <h5 class="user-info"><b></b>Reset Password</h5>
                                <p class="resetpass"> Create a new password  so that you can access SimGroup</p>
                                <form action="/action_page.php">
                                    <h6 class="creat">CREATE PASSWORD</h6>
                                    <input type="password" id="createPassword" name="createPassword" placeholder="Create Password"/>
                                    <h6 class="creat"> CONFIRM PASSWORD</h6>
                                    <div class="holderpass">
                                    <input  type="password" id="confirmPassword" name="confirmPassword" placeholder=" Confirm Password"/>
                                </div>
                                </form>
                                <div class="uppdte mt-4">
                                        <button  type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                        <div class="bulding">
                            <img src={require("images/aeroplane.png")}/>
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

    export default Header;
    