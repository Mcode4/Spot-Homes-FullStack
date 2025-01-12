//ACTION CREATORS
const loginAction = (user)=>{
    return {
        type: 'LOGIN_USER',
        payload: user
    }
}
const logoutAction = (user)=>{
    return {
        type: 'LOGOUT_USER',
        payload: user
    }
}
const errorAction = (err)=>{
    return {
        type: 'ERROR',
        payload: err
    }
}

//THUNK CREATORS
export const loginUserThunk = (loginInfo)=> async(dispatch) =>{
    const attempt = await fetch('/api/session', {
        method: 'POST',
        headers: 'application/json',
        body: loginInfo
    })
    if(attempt.status === 200){
        const body = await attempt.json()
        console.log('ok:', body)
        dispatch(loginAction(body))
    }
    else{
        dispatch(errorAction('Login Attempt Failed'))
    }
}

//REDUCER
const sessionReducer = (state, action)=>{
    switch(action.type){
        case 'ERROR':
            return 'USER---STATE'

        case 'LOGIN_USER':
            return 'USER---STATE'

        case 'LOGOUT_USER':
            return 'NO USER'
    }
}

export default sessionReducer