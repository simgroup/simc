const initialState={
    isLoggeIn:false,
    userData:"",
    tempUser:null,
}

 const reducer = (state= initialState,action)=>{
     const newState={...state}
     console.log("SIGN_UP",action)

    switch(action.type){
        case("doSomething"):{
            newState.data="cool Only"   
            break;
        }
        case ("SIGN_UP"):
            // newState.isLoggeIn= true
            break;
        case ("SIGN_IN"):   
            newState.isLoggeIn= true
            newState.userData=action.payload.data.responseData
            break;
        case ("TEMP_USER"):   
            newState.tempUser=action.payload
            break
        default:{
            console.log("DEFAULT CASE")
            break;
        }
    }
    console.log("before  returning",newState)
    return newState

 }


 export default reducer; 