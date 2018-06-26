//Creating the Actions for the app
export const Actions = {
    APP_increment: "APP_increment",
    APP_decrement : "APP_decrement",
    APP_reset : "APP_reset",
    APP_Login : "APP_Login",
    APP_Register : "APP_Register"
}

//Creating the State of the app
interface Login{
    name:string;
    password:string;
    errMsg:string;
}

interface Register{
    name:string;
    password:string;
    errMsg:string;
    succMsg:string;
}

export interface IAppState{
   counter:number;
   login:Login
   register:Register;
}

export const INITIAL_STATE: IAppState = {
    counter : 1,
    login : {
        name: "",
        password: "",
        errMsg:""
    },
    register : {
        name: "",
        password: "",
        errMsg: "",
        succMsg:"" 
    }
}

//Creating the reducer for the app
export function reducer(state:IAppState = INITIAL_STATE, action:any):IAppState{
    let currentState = JSON.parse(JSON.stringify(state))
    let newState = currentState;
    switch (action.type){
        case Actions.APP_increment:
            return Object.assign({}, state, {counter:state.counter+1});
        case Actions.APP_decrement: 
            return Object.assign({}, state, {counter:state.counter-1});
        case Actions.APP_reset: 
            return Object.assign({}, state, {counter:0});
        case Actions.APP_Login:
            newState.login = {name: action.data.loginName, password: action.data.loginPassword}
            return newState
        case Actions.APP_Register:
            newState.register = action.data;
            return newState
        default:
            return state;
    }
}



// import { combineReducers } from 'redux';
// import * as appReducer from "./../app.reducer"
// import * as navReducer from "./../side-nav/nav.reducer"

// //Creating the Actions for the app
// export const Actions = Object.assign({},appReducer.Actions,navReducer.Actions);

// //Creating the State of the app
// export interface IRootState{
//     app: appReducer.IAppState,
//     nav: navReducer.INav
// }

// export const INITIAL_STATE: IRootState = {
//     app: appReducer.INITIAL_STATE,
//     nav: navReducer.INITIAL_STATE
// }

// //Creating the reducer for the app
// export function reducer(state:IRootState = INITIAL_STATE, action:any):IRootState{
//     return combineReducers<IRootState>({
//         app: appReducer.reducer,
//         nav: navReducer.reducer
//     })(state, action);
// }