import {USER_LOGIN_DATA,} from './ActionTypes';


export const userLoginData =item=>dispatch=>{
    console.log(">>>>>>>>>>",item)
    dispatch({type:USER_LOGIN_DATA, payload:item})
}

