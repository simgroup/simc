import {USER_LOGIN_DATA,} from '../action/ActionTypes';

const initialState={
    userData:{}
}

export const reducer = (state=initialState, action)=>{
    console.log("storeData",action)
    switch(action.type){
        case USER_LOGIN_DATA :
            console.log("inside action",action)
            return {
                    ...state,
                    userData:action.payload
                    }

        default :   return {...state}
    }
}