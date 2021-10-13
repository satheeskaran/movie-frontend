const initialState =  { 
    isLogged: false,
    userid: null,
    username: null,
    password: null,
    isRememberPass: false,
    searchingTerm: ''
}
const reducer = (state = {}, action) => {
    switch(action.type){
        case "USER_DETAIL":
            return action.payload

        case "USERNAME":
            return {...state, username: action.payload}

        case "PASSWORD":
            return {...state, username: action.payload}

        case "USERID":
            return {...state, username: action.payload}

        case "ISLOGGED":
            return {...state, username: action.payload}

        case "ISREMEMBERPASS":
            return {...state, username: action.payload}

        case "SEARCHING":
            return {...state, searchingTerm: action.payload}

        case "LOGOUT":
            return {...state, isLogged: false}

        default:
            return state
    }
}

export default reducer


