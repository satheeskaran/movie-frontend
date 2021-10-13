
/* action for user */
export const UserDetail = (user) => {
    return {
        type: 'USER_DETAIL',
        payload : user
    }
}

export const UserName = (user) => {
    return {
        type: 'USERNAME',
        payload : user
    }
}

export const UserPassword = (user) => {
    return {
        type: 'PASSWORD',
        payload : user
    }
}

export const UserId = (user) => {
    return {
        type: 'USERID',
        payload : user
    }
}

export const IsLogged = (user) => {
    return {
        type: 'ISLOGGED',
        payload : user
    }
}

export const IsRemember = (user) => {
    return {
        type: 'ISREMEMBERPASS',
        payload : user
    }
}

export const Searching = (user) => {
    return {
        type: 'SEARCHING',
        payload : user
    }
}

export const Logout = (user) => {
    return {
        type: 'LOGOUT',
        payload : user
    }
}
