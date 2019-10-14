import React,{Component,Suspense} from 'react';
import './App.css';
import "./assets/css/style.css"

import "./assets/css/style_s.css"
import {connect} from "react-redux";
import Loader from "../src/components/loader/Loader"


import {BrowserRouter as Router} from "react-router-dom";
import {Route,Redirect,Switch} from "react-router-dom"

const Login = React.lazy(() => import('./screens/Login'));
const Temp = React.lazy(() => import('./screens/Temp'));


class  App extends Component{
  constructor(props){
    super(props)
    this.state={
    }
  }

  render(){
    return(
      <Router>
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path="/" exact  component={Login}/>
          <Route path="/temp" exact component={Temp}/>
        </Switch>
      </Suspense>
      </Router>
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
    // doSomething:()=> dispatch(actionCreator.doSomething(1))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
