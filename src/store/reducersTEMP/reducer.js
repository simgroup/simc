const initialState={
    data:"Cool carnation",
    customerDetail:{
        name:{},
        address:{
            flat:"",
            Lane:"",
            Nearby:""
        }
    }
}

 const reducer = (state= initialState,action)=>{
     const newState={...state}
    
    switch(action.type){
        case("doSomething"):{
            newState.data="cool Only"   
            break;
        }
         default:{
            break;
        }
    }
    return newState

 }


 export default reducer; 