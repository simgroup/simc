import apiRequest from  "../../apiServices/services"


export const doSomething =(val)=>{
    console.log("inside middleware",val);
 return {type:"doSomething",value:val}   
}

// export default function apiRequest(variables, apiName, apiMethod, token, signal) {

export const signUp = (data)=> async dispatch=>{
    dispatch({type:"SIGN_UP",payload:data})
}

export const logIn =(data)=>async dispatch=>{
    dispatch({type:"SIGN_IN",payload:data})
}
export const tempUser =(data)=>async dispatch=>{
    console.log(data)
    dispatch({type:"TEMP_USER",payload:data})
}